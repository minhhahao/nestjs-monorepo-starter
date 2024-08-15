import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '@app/modules/posts/dto';
import { PostsService } from '@app/modules/posts';
import { AccessTokenGuard } from '@app/guards';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async retrieve(@Param('id') id: string) {
    const numericId = isNaN(Number(id)) ? NaN : Number(id);
    return await this.postsService.retrieve(numericId);
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
