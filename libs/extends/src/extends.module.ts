import { Module } from '@nestjs/common';
import { ExtendsService } from './extends.service';

@Module({
  providers: [ExtendsService],
  exports: [ExtendsService],
})
export class ExtendsModule {}
