import { NestFactory } from '@nestjs/core';
import { QueuesModule } from './queues.module';

async function bootstrap() {
  const app = await NestFactory.create(QueuesModule);
  await app.listen(3002);
}
bootstrap();
