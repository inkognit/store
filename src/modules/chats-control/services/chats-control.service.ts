import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatsControl, Messages, Users } from '../../../db/entity';
import { CreateChatsControlDto } from '../dto/create-chats-control.dto';
import { UpdateChatsControlDto } from '../dto/update-chats-control.dto';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(ChatsControl)
        private readonly chatReposytory: Repository<ChatsControl>,
        @InjectRepository(Users)
        private readonly usersReposytory: Repository<Users>,
        @InjectRepository(Messages)
        private readonly messageReposytory: Repository<Messages>,
    ) {}

    async create(createChatsControlDto: CreateChatsControlDto) {
        const recipient = await this.usersReposytory.find({
            where: { id: createChatsControlDto.recipient_id },
        });
        if (!recipient) throw new NotFoundException('Пользователь не найден');
        const chat = new ChatsControl();
        chat.avatar = createChatsControlDto.avatar;
        chat.creator_id = createChatsControlDto.creator_id;
        chat.name = createChatsControlDto.name;
        chat.status = createChatsControlDto.status;

        await this.chatReposytory.save(chat);
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
