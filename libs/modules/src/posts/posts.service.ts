import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(private prisma: DatabaseService) {}

  async create(createPostDto: CreatePostDto) {
    const user = this.prisma.user.findUnique({
      where: { id: createPostDto.authorId },
    });
    if (!user) {
      throw new Error('Author not found');
    }
    createPostDto.authorId = Number(createPostDto.authorId);
    return await this.prisma.post.create({ data: createPostDto });
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
