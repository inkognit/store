import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './configs/filters/http-exeption-filters/http-exeption-filters.filter';

export const setup = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('Auth', 'APIs for authorize')
        .addTag('Users', 'APIs for Users test stores')
        .build();

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/openAPI', app, document);
};
