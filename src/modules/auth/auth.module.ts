import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions, Users } from '../../db/entity';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Sessions])],
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule {}
