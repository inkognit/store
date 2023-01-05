import {
    ClassSerializerInterceptor,
    MiddlewareConsumer,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as entity from '../../db/entity';
import { LoggingInterceptor } from '../logging-interceptor/logging-interceptor.interceptor';
import { SessionMiddleware } from '../middlewares/session.middleware';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (consigService: ConfigService) => ({
                type: 'postgres',
                host: consigService.get<string>('DB_HOST'),
                port: +consigService.get<number>('DB_PORT'),
                username: consigService.get<string>('DB_USERNAME'),
                password: consigService.get<string>('DB_PASSWORD'),
                database: consigService.get<string>('DB_NAME'),
                entities: Object.values(entity),
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            validationSchema: Joi.object({
                PORT: Joi.number().default(7337),
                SALT: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            }),
        }),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async () => ({
                transports: [
                    new winston.transports.File({
                        maxFiles: 1,
                        maxsize: 104857600,
                        filename: 'logs/info.log',
                        format: winston.format.combine(
                            winston.format(
                                (info) => info.level === 'info' && info,
                            )(),
                        ),
                        level: 'info',
                    }),
                    new winston.transports.File({
                        maxFiles: 1,
                        maxsize: 104857600,
                        filename: 'logs/error.log',
                        format: winston.format.combine(
                            winston.format(
                                (info) => info.level === 'error' && info,
                            )(),
                        ),
                        level: 'error',
                    }),
                ],
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        ConfigService,
        JwtService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
    exports: [CoreModule],
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SessionMiddleware)
            .exclude({ path: 'auth', method: RequestMethod.POST }, 'auth/(.*)')
            .forRoutes('*');
    }
}
