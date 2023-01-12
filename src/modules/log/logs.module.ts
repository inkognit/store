import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LogsController } from './controller/logs.controller';
import { LogsService } from './service/logs.service';

@Module({
    controllers: [LogsController],
    providers: [LogsService, JwtService],
})
export class LogsModule {}
