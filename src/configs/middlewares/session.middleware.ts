import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    use(req: any, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            req.session = this.jwtService.decode(token.substring(7));
        }
        next();
    }
}
