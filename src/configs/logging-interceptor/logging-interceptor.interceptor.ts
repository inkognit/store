import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';
import * as UAParser from 'ua-parser-js';
import { Logger } from 'winston';
import { Logs } from '../../db/entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectRepository(Logs)
        private readonly logsRepository: Repository<Logs>,
    ) {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.getArgByIndex(0);

        const cutLongString = (someObj, iteration = 0) => {
            const data =
                iteration > 0 ? someObj : JSON.parse(JSON.stringify(someObj));
            if (typeof data !== 'object') return data;
            for (const key in data) {
                let item = data[key];
                if (typeof item === 'string' && item.length > 500) {
                    item = '<---Long string--->';
                }
                if (typeof item === 'object')
                    cutLongString(item, iteration + 1);
            }
            return data;
        };

        const body = cutLongString(request.body);

        const messageData = {
            data: body.password ? { ...body, password: '********' } : body,
            method: request.method,
            ip: request.ip,
            os: UAParser(request.headers['user-agent']).os,
            device: UAParser(request.headers['user-agent']).device,
            referer: request.headers.request,
            create_at: new Date().toUTCString(),
        };

        return next.handle().pipe(
            tap(async () => {
                const log = new Logs();
                log.level = 'log';
                log.os = messageData.os.toString();
                log.device = messageData.device.toString();
                log.url = messageData.referer;
                log.method = messageData.method;
                log.ip = messageData.ip;
                log.message = JSON.stringify(body);
                try {
                    await this.logsRepository.save(log);
                } catch (error) {
                    console.log(error);
                }

                this.logger.info({ ...cutLongString(messageData) });
            }),
            catchError(async (err) => {
                const log = new Logs();
                log.level = 'error';
                log.os = messageData.os.toString();
                log.device = messageData.device.toString();
                log.url = messageData.referer;
                log.method = messageData.method;
                log.ip = messageData.ip;
                log.message = err.message || JSON.stringify(err);
                await this.logsRepository.save(log);
                console.log(log);
                this.logger.error(log);
                throw err;
            }),
        );
    }
}
