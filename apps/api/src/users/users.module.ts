import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModuleLib } from '@app/modules/users';

@Module({
  imports: [UsersModuleLib],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
