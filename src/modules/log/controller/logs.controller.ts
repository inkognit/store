import { Controller, Delete, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogsService } from '../service/logs.service';

@ApiTags('Logs')
@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Get()
    findAll() {
        return this.logsService.createReportXLSX();
    }

    @Delete()
    remove() {
        return this.logsService.remove();
    }
}
