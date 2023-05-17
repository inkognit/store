import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsControl, Messages, Users } from '../../db/entity';
import { ChatsController } from './controller/chats-control.controller';
import { ChatAppGateway } from './gateways/chat_app.gateway';
import { ChatsService } from './services/chats-control.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChatsControl, Messages, Users])],
    controllers: [ChatsController],
    providers: [ChatsService, ChatAppGateway],
})
export class ChatsControlModule {}
