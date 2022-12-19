import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../db/entities/user.entity';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {}
