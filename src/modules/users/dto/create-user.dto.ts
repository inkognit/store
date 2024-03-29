import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'User login' })
    @IsString()
    login: string;

    @ApiProperty({ description: 'User pass' })
    @IsString()
    password: string;

    @ApiProperty({ description: 'User name' })
    @IsString()
    first_name: string;

    @ApiProperty({ description: 'User surname' })
    @IsString()
    middle_name: string;

    @ApiProperty({ description: 'User familyname' })
    @IsString()
    last_name: string;

    @ApiProperty({ description: 'User birthday' })
    @IsDateString()
    bithday: Date;

    @ApiPropertyOptional({ description: 'User avatar' })
    @IsOptional()
    @IsString()
    avatar?: string;
}
