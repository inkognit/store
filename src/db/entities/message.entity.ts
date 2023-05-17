import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ChatsControl } from './chats-control.entity';

@Entity('messages', { schema: 'test' })
export class Messages {
    @PrimaryGeneratedColumn({ comment: 'message id' })
    id: number;

    @Column({ comment: 'Sender id' })
    sender_id: number;

    @Column({ comment: 'Message text' })
    text: string;

    @Column({ comment: 'Edition status' })
    is_edition: boolean;

    @Column({ comment: 'Chat id' })
    chat_id: number;

    @CreateDateColumn({
        comment: 'Date create',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    create_at: Date;

    @UpdateDateColumn({
        comment: 'Date update',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    update_at: Date;

    @ManyToOne(() => ChatsControl, (chat) => chat.messages)
    @JoinColumn({ name: 'chat_id', referencedColumnName: 'id' })
    chat: ChatsControl;
}
