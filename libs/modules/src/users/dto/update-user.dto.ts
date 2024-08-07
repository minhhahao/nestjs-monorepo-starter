import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @ApiProperty({ required: false, example: 'example@gmail.com' })
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  refreshToken: string;
}
