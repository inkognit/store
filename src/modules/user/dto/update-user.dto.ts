import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'User Password' })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiPropertyOptional({ description: 'User name' })
    @IsOptional()
    @IsString()
    first_name?: string;

    @ApiPropertyOptional({ description: 'User surname' })
    @IsOptional()
    @IsString()
    middle_name?: string;

    @ApiPropertyOptional({ description: 'User familyname' })
    @IsOptional()
    @IsString()
    last_name?: string;

    @ApiPropertyOptional({ description: 'User birthday' })
    @IsOptional()
    @IsDateString()
    bithday?: Date;

    @ApiPropertyOptional({ description: 'User avatar' })
    @IsOptional()
    @IsString()
    avatar?: string;
}
