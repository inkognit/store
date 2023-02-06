import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../db/entity';

@Injectable()
export class AuthoGuard implements CanActivate {
    secret: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {
        this.secret = this.configService.get<string>('JWT_SECRET');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            if (req.headers && req.headers.authorization) {
                const { authorization } = req.headers;
                const result = await this.jwtService.verifyAsync(
                    authorization.substring(7),
                    { secret: this.secret },
                );
                return result;
            }
        } catch (error) {
            if (error.expiredAt) {
                if (req.headers && req.headers.authorization) {
                    const { authorization } = req.headers;
                    const result = this.jwtService.decode(
                        authorization.substring(7),
                    );
                    if (result && typeof result == 'object' && result.user_id) {
                        const user = await this.userRepository.findOne({
                            where: {
                                id: result.user_id,
                            },
                            select: {
                                refresh_token: true,
                                id: true,
                                first_name: true,
                                login: true,
                            },
                        });
                        if (!user || !user.refresh_token) {
                            throw new ForbiddenException('Forbidden!!!!');
                        }
                        const is_refresh = await this.jwtService.verifyAsync(
                            user.refresh_token,
                            { secret: this.secret },
                        );
                        if (is_refresh) {
                            const payload = {
                                user_id: user.id,
                                role: 1,
                                user_name: user.first_name,
                                login: user.login,
                                ip: req.ip,
                            };
                            const access_token = this.jwtService.sign(payload, {
                                expiresIn: '5m',
                                secret: Buffer.from(process.env.JWT_SECRET),
                            });
                            req.headers.authorization = access_token;
                            return true;
                        }
                    }

                    // return result;
                }
            }
            throw new ForbiddenException('Доступ запрещен');
        }
    }
}
