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
import { Sessions, Users } from '../../../db/entity';
import { CreateAuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>,
        @InjectRepository(Sessions)
        private readonly sessionRepo: Repository<Sessions>,
        private jwtService: JwtService,
    ) {}

    async signIn(createAuthDto: CreateAuthDto, ip: string, device: string) {
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
        if (!access) throw new ForbiddenException('Нет доступа');
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
        const session = new Sessions();
        session.access_token = access_token;
        session.refresh_token = refreshToken;
        session.user_id = user.id;
        session.device = device;
        session.ip = ip;

        const old_sessions = await this.sessionRepo.find({ where: { device } });
        try {
            await Promise.all([
                this.sessionRepo.save(
                    old_sessions.map((session) => ({
                        ...session,
                        is_used: !session.is_used,
                    })),
                ),
                this.sessionRepo.save(session),
            ]);
        } catch (error) {
            console.error(error);
        }
        return { access_token, user };
    }

    async refreshToken(access_token: string) {
        // const chek = await this.jwtService.verifyAsync(access_token, {
        //     secret: Buffer.from(process.env.JWT_SECRET),
        // });
        // const chek1 = await this.jwtService;
        return access_token;
    }

    async signOut(id: number) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new BadRequestException('User not found');
        user.refresh_token = null;
        return this.userRepo.save(user);
    }
}
