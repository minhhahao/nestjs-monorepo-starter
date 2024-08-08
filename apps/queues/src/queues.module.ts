import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { SendMailModule } from './send-mail/send-mail.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    SendMailModule,
  ],
})
export class QueuesModule {}
