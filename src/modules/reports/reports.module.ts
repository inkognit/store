import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MulterModule } from '@nestjs/platform-express';
import { UploadFilesController } from './controller/reports.controller';
import { UploadFilesService } from './services/reports.service';

@Module({
    imports: [
        // MulterModule.registerAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: () => ({
        //         dest: './uploads',
        //     }),
        // }),
    ],
    controllers: [UploadFilesController],
    providers: [UploadFilesService],
})
export class ReportsModule {}
