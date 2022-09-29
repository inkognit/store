import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Auth } from './configs/middlewares/auth.middleware';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Auth).forRoutes('');
  }
}
