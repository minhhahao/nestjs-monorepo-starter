import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name?: string;

  @IsEmail()
  @ApiProperty({ required: false, example: 'example@gmail.com' })
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(8)
  @Max(20)
  password?: string;
}
