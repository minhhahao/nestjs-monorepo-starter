import { IsEmail, IsEnum, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveUserDto {
  @ApiProperty()
  @IsNumberString()
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @IsEmail()
  @ApiProperty({ required: true, example: 'example@gmail.com' })
  email: string;

  @ApiProperty()
  @IsEnum(['USER', 'ADMIN'])
  role: string;
}
