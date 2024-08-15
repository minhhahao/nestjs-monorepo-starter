import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ required: false })
  authorId?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  published?: boolean;

  @IsOptional()
  @ApiProperty({ required: false })
  thumbnail?: string;
}
