import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { DatabaseModule } from '@app/database';

@Module({
  providers: [PostsService],
  exports: [PostsService],
  imports: [DatabaseModule],
})
export class PostsModuleLib {}
