import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs', { schema: 'test' })
export class Logs {
    @PrimaryGeneratedColumn({ comment: 'Log ID' })
    id: number;

    @Column({ comment: 'log level' })
    level: string;

    @Column({ comment: 'Operation system' })
    os: string;

    @Column({ comment: 'Device model', nullable: true })
    device: string;

    @Column({ comment: 'Route' })
    url: string;

    @Column({ comment: 'Method API' })
    method: string;

    @Column({ comment: 'Log text message' })
    message: string;

    @Column({ comment: 'IP client adress' })
    ip: string;

    @Column({
        comment: 'Date create',
        type: 'timestamptz',
        default: () => 'NOW()',
        nullable: true,
    })
    create_at: Date;
}
