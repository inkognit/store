import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Users } from '../../../db/entities/user.entity';
import { CreateAuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
    ) {}

    async signIn(createAuthDto: CreateAuthDto) {
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
            const payload = { user_id: user.id };
            const access_token = jwt.sign(
                payload,
                Buffer.from(process.env.JWT_SECRET),
                { expiresIn: '5m' },
            );
            user.refresh_token = jwt.sign(
                payload,
                Buffer.from(process.env.JWT_SECRET),
                { expiresIn: '1d' },
            );
            this.userRepo.save(user);
        }
        throw 'Нет доступа';
    }

    refreshToken(queries) {
        return `This action returns a #${queries} Auth`;
    }

    signOut(id: number) {
        return `This action removes a #${id} Auth`;
    }
}
