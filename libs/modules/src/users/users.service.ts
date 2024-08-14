import { omit } from 'lodash';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number, fields: string[] = []) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (fields.length) {
      return omit(user, fields);
    }
    return omit(user, ['password', 'refreshToken']);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return omit(user, ['password', 'refreshToken']);
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
