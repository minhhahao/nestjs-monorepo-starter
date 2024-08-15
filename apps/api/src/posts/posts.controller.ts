import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';

import { CreatePostDto, UpdatePostDto } from '@app/modules/posts/dto';
import { PostsService } from '@app/modules/posts';
import { AccessTokenGuard } from '@app/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { getFileName } from '@app/utils/string';
import { S3File, S3Service } from '@app/extends';

@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  private s3Service: S3Service;
  constructor(private readonly postsService: PostsService) {
    this.s3Service = new S3Service();
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: memoryStorage(),
    }),
  )
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const s3File: S3File = {
      bucketName: process.env.AWS_BUCKET_NAME,
      key: await getFileName(file),
      file: file.buffer,
    };
    await this.s3Service.uploadFile(s3File);
    return await this.postsService.create(createPostDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = isNaN(Number(id)) ? NaN : Number(id);
    return await this.postsService.findOne(numericId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(+id);
  }
}
