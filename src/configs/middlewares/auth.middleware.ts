import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class Auth implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['token'];
      const isToken = token;
      if (isToken) next();
    } catch (error) {
      throw new Error('');
    }
  }
}
