import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadFilesService {
    uploadImages(files: any) {
        const data = {};
        for (const item in files) {
            data[item] = files[item][0]['buffer'].toString('base64');
        }
        return data;
    }
}
