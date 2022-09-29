import { ApiProperty } from '@nestjs/swagger';
// import { IsNumber } from '@nestjs/decorators';

export class User {
  @ApiProperty({ description: 'User Id' })
  //   @IsNumber()
  id: number;

  //   constructor() {}
}
