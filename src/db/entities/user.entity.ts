import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Sessions } from './sessions.entity';

@Entity('users', { schema: 'test' })
export class Users {
    @PrimaryGeneratedColumn({ comment: 'User id', name: 'user_id' })
    id: number;

    @Column({ comment: 'User login' })
    login: string;

    @Column({ comment: 'User password' })
    password: string;

    @Column({ comment: 'User first name' })
    first_name: string;

    @Column({ comment: 'User middle name' })
    middle_name: string;

    @Column({ comment: 'User last name' })
    last_name: string;

    @Column({ comment: 'User bithday', type: 'timestamptz', nullable: true })
    bithday: Date;

    @Column({ nullable: true })
    refresh_token: string;

    @Column({ comment: 'Role id' })
    roles_id: number;

    @Column({ comment: 'User avatar', nullable: true })
    avatar: string;

    @OneToOne(() => Role)
    @JoinColumn({ name: 'roles_id' })
    role: Role;

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

    @OneToMany(() => Sessions, (session) => session.user)
    sessions: Sessions[];

    // @ManyToMany(() => ChatsControl, (chat) => chat.users, { eager: true })
    // @JoinTable({
    //     name: 'users_chats',
    //     joinColumn: {
    //         name: 'user_id',
    //         referencedColumnName: 'id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'chat_id',
    //         referencedColumnName: 'id',
    //     },
    // })
    // chats: ChatsControl[];
}
