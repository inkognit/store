import { Injectable } from '@nestjs/common';
import {
    BadRequestException,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

import { Repository } from 'typeorm';
import { Users } from '../../../db/entities/user.entity';
import { CreateAuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    async signIn(createAuthDto: CreateAuthDto, ip: string) {
        const user = await this.userRepo.findOne({
            where: { login: createAuthDto.login },
        });
        if (!user) {
            throw new NotFoundException('Такого пользователя не существует');
        }
        const access = await argon2.verify(
            user.password,
            createAuthDto.password,
            { salt: Buffer.from(process.env.SALT) },
        );
        if (access) {
            const payload = {
                user_id: user.id,
                role: 1,
                user_name: user.first_name,
                login: user.login,
                ip,
            };

            const access_token = this.jwtService.sign(payload, {
                expiresIn: '5m',
                secret: Buffer.from(process.env.JWT_SECRET),
            });
            const refreshToken = this.jwtService.sign(
                { ...payload, signature: access_token.split('.')[2] },
                {
                    expiresIn: '1d',
                    secret: Buffer.from(process.env.JWT_SECRET),
                },
            );

            user.refresh_token = refreshToken;
            this.userRepo.save(user);
            return { access_token, user };
        }
        throw new ForbiddenException('Нет доступа');
    }

    async refreshToken(access_token: string) {
        const chek = await this.jwtService.verifyAsync(access_token, {
            secret: Buffer.from(process.env.JWT_SECRET),
        });
        const chek1 = await this.jwtService;
    }

    async signOut(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new BadRequestException('User not found');
        user.refresh_token = null;
        return this.userRepo.save(user);
    }
}
