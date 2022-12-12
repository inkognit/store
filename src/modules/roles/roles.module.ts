import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../db/entities/user.entity';
import { RolesController } from './controller/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {}
