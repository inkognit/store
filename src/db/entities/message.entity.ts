import { Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatsControl } from './chats-control.entity';

@Entity('messages', { schema: 'test' })
export class Messages {
    @PrimaryGeneratedColumn({})
    id: number;

    @ManyToOne(() => ChatsControl, (chat) => chat.messages)
    @JoinTable()
    chat: ChatsControl;
}
