import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadFiles } from '../../../configs/decorators/uploadFiles.decorator';
import { UploadFilesService } from '../services/reports.service';

@ApiTags('Upload Files')
@Controller('upload')
export class UploadFilesController {
    constructor(private readonly reportsService: UploadFilesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    getFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return 'file upload';
    }

    @Post('uploads')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }

    @Post('img')
    @UploadFiles(
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    )
    uploadImages(
        @UploadedFiles()
        files: {
            avatar?: Express.Multer.File[];
            background?: Express.Multer.File[];
        },
    ) {
        console.log(files);
        const result = this.reportsService.uploadImages(files);
        return result;
    }
}
