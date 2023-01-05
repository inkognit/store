import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { catchError, Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        console.log('before');
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
            headers: request.headers,
            timeStamp: now,
            route: request.url,
        };

        return next.handle().pipe(
            tap((data) =>
                this.logger.info({ ...cutLongString(data), messageData }),
            ),
            catchError((err) => {
                console.log(err);
                throw err;
            }),
        );
    }
}
