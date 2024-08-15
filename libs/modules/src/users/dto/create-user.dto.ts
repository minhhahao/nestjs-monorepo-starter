import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  email: string;
}
