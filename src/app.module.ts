import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Auth } from './configs/middlewares/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule, RolesModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .exclude({ path: 'auth', method: RequestMethod.POST }, 'auth/(.*)')
      .forRoutes('*');
  }
}
