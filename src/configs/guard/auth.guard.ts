import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Sessions, Users } from '../../db/entity';

@Injectable()
export class AuthoGuard implements CanActivate {
    secret: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(Sessions)
        private readonly sessionRepo: Repository<Sessions>,
        private readonly dataSource: DataSource,
    ) {
        this.secret = this.configService.get<string>('JWT_SECRET');
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const { headers } = req;
        if (headers?.authorization) {
            const { authorization } = req.headers;
            const access_token = authorization.substring(7);
            try {
                const result = await this.jwtService.verifyAsync(access_token, {
                    secret: this.secret,
                });
                return result;
            } catch (error) {
                if (error.expiredAt) {
                    //"TokenExpiredError"
                    const result = this.jwtService.decode(access_token);
                    if (result && typeof result == 'object' && result.user_id) {
                        const [user, sessions] = await Promise.all([
                            this.userRepository.findOne({
                                where: { id: result.user_id },
                            }),
                            this.sessionRepo.find({
                                where: {
                                    user_id: result.user_id,
                                    is_used: false,
                                    device: headers['user-agent'],
                                },
                                order: { create_at: 'ASC' },
                            }),
                        ]);

                        if (!user || !sessions.length) {
                            throw new ForbiddenException('Forbidden!!!!');
                        }
                        const is_refresh = await this.jwtService.verifyAsync(
                            sessions[0].refresh_token,
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
                            const session = new Sessions();
                            session.access_token = access_token;
                            session.device = headers['user-agent'];
                            session.ip = req.ip;
                            session.refresh_token = sessions[0].refresh_token;
                            session.user_id = user.id;
                            await Promise.all([
                                this.sessionRepo.save([
                                    ...sessions.map((s) => ({
                                        ...s,
                                        is_used: true,
                                    })),
                                    session,
                                ]),
                            ]);
                            res.set({ authorization: access_token });
                            return true;
                        }
                    }
                }
            }
        }
        throw new ForbiddenException('Доступ запрещен');
    }
}
