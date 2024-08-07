import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @IsEmail()
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  email: string;
}
