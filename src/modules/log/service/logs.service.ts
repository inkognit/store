import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import * as UAParser from 'ua-parser-js';

@Injectable()
export class LogsService {
    constructor(private readonly jwtService: JwtService) {}

    async createReportXLSX() {
        try {
            const fullPath = path.resolve('D:\\home\\store\\', 'logs/logs.log');
            const text: string = fs.readFileSync(fullPath, 'utf8');
            const arr = text.split('\n');
            const newArr = arr.filter(
                (a) =>
                    a.indexOf('api/booking/open') != -1 &&
                    a.indexOf('Bearer ') != -1,
            );

            const [r] = await Promise.all([
                newArr.map((n) => ({
                    coordinates: !!this.jwtService.decode(
                        JSON.parse(n).headers.authorization.substring(7),
                    )['latitude'],
                    timestamp: new Date(JSON.parse(n).timestamp).toUTCString(),
                    ['user-agent']: {
                        os: UAParser(JSON.parse(n).headers['user-agent']).os,
                        device: UAParser(JSON.parse(n).headers['user-agent'])
                            .device,
                    },
                })),
            ]);
            fs.writeFileSync(
                path.resolve('D:\\home\\store\\', 'logs/logsNew.log'),
                Buffer.from(r.join(',\n')),
            );
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'Admin';
            workbook.created = new Date();
            workbook.views = [
                {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 200,
                    firstSheet: 0,
                    activeTab: 1,
                    visibility: 'visible',
                },
            ];
            // workbook.getCell;

            const worksheet = workbook.addWorksheet('Statistic');
            worksheet.columns = [
                { header: 'Coordinates', key: 'coordinates', width: 30 },
                {
                    header: 'User agent',
                    key: 'user-agent',
                    width: 200,
                },
                {
                    header: 'Date',
                    key: 'timestamp',
                    width: 50,
                },
            ];
            await Promise.all([r.map((w) => worksheet.addRow(w).commit())]);

            return workbook.xlsx.writeFile('logs/statistic.xlsx');
        } catch (error) {
            console.log(error);
        }
    }

    remove() {
        return `This action removes a  log`;
    }
}
