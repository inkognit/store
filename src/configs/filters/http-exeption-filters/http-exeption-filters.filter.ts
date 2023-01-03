import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        const statusCode =
            exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof TypeORMError) {
            return res
                .status(statusCode)
                .json({ message: 'Ошибка обработки БД' });
        }
        // Дописать проверку для статусов и для кодов
        if (exception?.getStatus?.()) {
            return res.status(statusCode).json({
                message: exception.message,
                code: exception.response.code,
            });
        } else {
            return res.status(statusCode).json({ message: exception.message });
        }
    }
}
