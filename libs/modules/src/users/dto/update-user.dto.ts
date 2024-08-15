import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'John Doe' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, example: 'example@gmail.com' })
  email?: string;

  @IsOptional()
  @ApiProperty()
  refreshToken?: string;
}
