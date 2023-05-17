import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
    'login',
    'password',
]) {
    @ApiPropertyOptional({ description: 'User Password' })
    @IsString()
    @IsOptional()
    password?: string;

    @ApiPropertyOptional({ description: 'User Password' })
    @IsString()
    @IsOptional()
    new_password?: string;
}
