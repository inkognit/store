import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../db/entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
