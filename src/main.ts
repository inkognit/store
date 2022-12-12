import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setup } from './app-setup';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    setup(app);
    await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
