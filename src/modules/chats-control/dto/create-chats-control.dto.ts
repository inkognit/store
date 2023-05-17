import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ description: 'Who created chat' })
    @IsNumber()
    sender_id: number;

    @ApiProperty({ description: 'Who created chat' })
    @IsString()
    text: string;

    @ApiPropertyOptional({ description: 'Who created chat', default: false })
    @IsOptional()
    @IsBoolean()
    is_edition?: boolean;

    @ApiProperty({ description: 'Who created chat' })
    @IsNumber()
    chat_id: number;
}

export class CreateChatsControlDto {
    @ApiProperty({ description: 'Who created chat' })
    @IsNumber()
    creator_id: number;

    @ApiProperty({ description: 'Who received chat' })
    @IsNumber()
    recipient_id: number;

    @ApiPropertyOptional({
        description: '1 - two users, 2 - more than two users',
    })
    @IsOptional()
    @IsIn([1, 2])
    status?: number;

    @ApiPropertyOptional({ description: 'User login' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'User login' })
    @IsOptional()
    @IsString()
    avatar?: string;

    @ApiPropertyOptional({ description: 'User login' })
    @IsOptional()
    message?: CreateMessageDto;
}
