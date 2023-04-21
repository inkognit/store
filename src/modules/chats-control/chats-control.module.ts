import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './controller/chats-control.controller';
import { ChatsService } from './services/chats-control.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [ChatsController],
    providers: [ChatsService],
})
export class ChatsControlModule {}
