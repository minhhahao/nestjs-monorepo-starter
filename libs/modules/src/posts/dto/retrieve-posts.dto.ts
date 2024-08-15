import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrievePostDto {
  @ApiProperty()
  @IsNumberString()
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  title: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  authorId: number;
}
