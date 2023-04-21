import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('users_chats', { schema: 'test' })
export class UserChats {
    @Column({ comment: 'User id' })
    user_id: number;

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
}
