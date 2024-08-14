import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { S3File } from './s3.interface';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({ region: process.env.AWS_REGION });
  }

  async uploadFile(file: S3File): Promise<any> {
    const input = {
      Bucket: file.bucketName,
      Key: file.key,
      Body: file.file.content,
    };

    const command = new PutObjectCommand(input);
    return await this.s3Client.send(command);
  }
}
