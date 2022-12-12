import { Module } from '@nestjs/common';
import { CoreModule } from './configs/core/core';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [AuthModule, CoreModule, UserModule, RolesModule],
})
export class AppModule {}
