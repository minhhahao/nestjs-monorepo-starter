import { Module } from '@nestjs/common';
import { ExtendsService } from './extends.service';
import { S3Service } from './aws/s3.service';

@Module({
  providers: [ExtendsService, S3Service],
  exports: [ExtendsService, S3Service],
})
export class ExtendsModule {}
