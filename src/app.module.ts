import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './configs/core/core';
import { HttpExceptionFilter } from './configs/filters/http-exeption-filters/http-exeption-filters.filter';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [AuthModule, CoreModule, UserModule, RolesModule],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
