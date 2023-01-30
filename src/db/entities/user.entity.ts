import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

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

    @OneToOne(() => Role)
    @JoinColumn({ name: 'roles_id' })
    role: Role;

    @Column({
        comment: 'Date create',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    create_at: Date;

    @Column({
        comment: 'Date update',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    update_at: Date;
}
