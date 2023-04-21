import { Injectable } from '@nestjs/common';
import { CreateChatsControlDto } from '../dto/create-chats-control.dto';
import { UpdateChatsControlDto } from '../dto/update-chats-control.dto';

@Injectable()
export class ChatsService {
    create(createChatsControlDto: CreateChatsControlDto) {
        return 'This action adds a new chatsControl';
    }

    findAll() {
        return `This action returns all chatsControl`;
    }

    findOne(id: number) {
        return `This action returns a #${id} chatsControl`;
    }

    update(id: number, updateChatsControlDto: UpdateChatsControlDto) {
        return `This action updates a #${id} chatsControl`;
    }

    remove(id: number) {
        return `This action removes a #${id} chatsControl`;
    }
}
