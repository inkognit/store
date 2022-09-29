import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class Auth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    const isToken = token;
    if (isToken) next();
    console.log('Accesfull!');
    throw new Error('');
  }
}
