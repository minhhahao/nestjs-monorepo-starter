import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsModuleLib } from '@app/modules/posts';

@Module({
  imports: [PostsModuleLib],
  controllers: [PostsController],
  providers: [],
})
export class PostsModule {}
