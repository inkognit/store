import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity('sessions', { schema: 'test' })
export class Sessions {
    @PrimaryGeneratedColumn({ comment: 'session id' })
    id: number;

    @Column({ comment: 'user id' })
    user_id: number;

    @Column({ comment: 'access token', unique: true })
    access_token: string;

    @Column({ comment: 'refresh token', unique: true })
    refresh_token: string;

    @Column({ comment: 'used or not', default: false, nullable: true })
    is_used: boolean;

    @Column({ comment: 'ip adres' })
    ip: string;

    @Column({ comment: 'device, by used' })
    device: string;

    @CreateDateColumn({
        comment: 'Date create',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    create_at: Date;

    @ManyToOne(() => Users, (user) => user.sessions)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;
}
