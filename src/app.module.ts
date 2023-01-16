import { Module } from '@nestjs/common';
import { CoreModule } from './configs/core/core';
import { AuthModule } from './modules/auth/auth.module';
import { LogsModule } from './modules/log/logs.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [AuthModule, CoreModule, UserModule, RolesModule, LogsModule],
})
export class AppModule {}
