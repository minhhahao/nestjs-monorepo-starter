import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('send-mail')
export class SendMailProcessor {
  private readonly logger = new Logger(SendMailProcessor.name);

  @Process('user-sign-up')
  async handleSendMailSignUp(job: Job) {
    this.logger.log('Processing send mail sign up job');
    this.logger.log(job.data);
  }
}
