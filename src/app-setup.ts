import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { HttpExceptionFilter } from './configs/filters/http-exeption-filters/http-exeption-filters.filter';

export const setup = (app: INestApplication) => {
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    // app.use(compression()); // Необходим для сжатия больших объемов. Потому лучше не использовать где попало

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('Auth', 'APIs for authorize')
        .addTag('Users', 'APIs for Users test stores')
        .addTag('Roles', 'APIs for CRUD roles')
        .addTag('Reports', 'APIs for CRUD & analisate reports')
        .build();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/openAPI', app, document);
};
