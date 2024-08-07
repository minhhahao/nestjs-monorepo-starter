import { IsEmail, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends PartialType(UserDto) {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  email: string;
}
