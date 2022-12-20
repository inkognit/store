import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    @ApiProperty({ description: 'User Id' })
    id: number;

    @Expose()
    @ApiProperty({ description: 'User login' })
    login: string;

    @Expose()
    @ApiProperty({ description: 'User name' })
    first_name: string;

    @Expose()
    @ApiProperty({ description: 'User surname' })
    middle_name: string;

    @Expose()
    @ApiProperty({ description: 'User familyname' })
    last_name: string;

    @Expose()
    @ApiProperty({ description: 'User birthday' })
    bithday: Date;

    @Expose()
    @ApiProperty({ description: 'User created' })
    create_at: Date;

    @Expose()
    @ApiProperty({ description: 'User update at' })
    update_at: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
