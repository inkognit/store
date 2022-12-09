import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
    @ApiProperty({ description: 'User login' })
    @IsString()
    login: string;

    @ApiProperty({ description: 'User pass' })
    @IsString()
    password: string;
}
