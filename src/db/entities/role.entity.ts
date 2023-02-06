import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles', schema: 'test' })
export class Role {
    @PrimaryGeneratedColumn({ comment: 'Role id' })
    id: number;

    @Column({ comment: 'Role name' })
    name: string;

    @Column({ comment: 'Access level' })
    access_level: number;

    @Column({ comment: 'Create user ID' })
    user_create: number;

    @Column({ comment: 'Update user ID' })
    user_update: number;

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
