import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SendMailProcessor } from './send-mail.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  providers: [SendMailProcessor],
})
export class SendMailModule {}
