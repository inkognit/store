import { MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entity from '../../db/entity';
import { Auth } from '../middlewares/auth.middleware';

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
    ],
    exports: [CoreModule],
    providers: [ConfigService],
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(Auth)
            .exclude({ path: 'auth', method: RequestMethod.POST }, 'auth/(.*)')
            .forRoutes('*');
    }
}
