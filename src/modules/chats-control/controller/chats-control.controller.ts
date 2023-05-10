import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Session,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthoGuard } from '../../../configs/guard/auth.guard';
import { TSession } from '../../../configs/interfaces/types';
import { CreateChatsControlDto } from '../dto/create-chats-control.dto';
import { UpdateChatsControlDto } from '../dto/update-chats-control.dto';
import { ChatsService } from '../services/chats-control.service';

@ApiBearerAuth()
@Controller('chats')
@ApiTags('Chat crud')
@UseGuards(AuthoGuard)
export class ChatsController {
    constructor(private readonly chatsControlService: ChatsService) {}

    @Post()
    async create(
        @Body() createChatsControlDto: CreateChatsControlDto,
        @Session() session: TSession,
    ) {
        const chat = await this.chatsControlService.create({
            ...createChatsControlDto,
            creator_id: session.user_id,
        });
        return chat;
    }

    @Get()
    async findAll() {
        return this.chatsControlService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.chatsControlService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChatsControlDto: UpdateChatsControlDto,
    ) {
        return this.chatsControlService.update(+id, updateChatsControlDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.chatsControlService.remove(+id);
    }
}
