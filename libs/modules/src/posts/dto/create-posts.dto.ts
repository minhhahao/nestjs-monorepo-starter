import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  authorId: number;

  @IsOptional()
  @ApiProperty({ required: false, type: 'file' })
  thumbnail?: string;
}
