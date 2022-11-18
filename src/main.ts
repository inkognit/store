import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setup } from './modules/app-setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  setup(app);
  await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
