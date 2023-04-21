import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Messages } from './message.entity';
import { Users } from './user.entity';

@Entity('chat', { schema: 'test' })
export class ChatsControl {
    @PrimaryGeneratedColumn({ comment: 'Chat id' })
    id: number;

    @Column({ comment: 'Role name' })
    creator_id: number;

    @Column({ comment: 'User name' })
    user_id: number;

    @Column({ comment: 'Status' })
    status: number;

    @Column({ comment: 'Chat name' })
    name: string;

    @Column({ comment: 'Chat name' })
    avatar: string;

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

    @ManyToMany(() => Users, (user) => user.chats)
    @JoinTable({
        name: 'users_chats',
        joinColumn: {
            name: 'chat_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    users: Users[];

    @OneToMany(() => Messages, (message) => message.chat)
    messages: Messages[];
}
