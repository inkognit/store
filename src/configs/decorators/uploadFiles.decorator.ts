import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IUploadFiles } from '../interfaces/upload-files.interface';

export const UploadFiles = (...files: IUploadFiles[]) => {
    return applyDecorators(
        SetMetadata('files', files),
        UseInterceptors(FileFieldsInterceptor(files)),
        // UsePipes(FileSizeValidationPipe),
    );
};
