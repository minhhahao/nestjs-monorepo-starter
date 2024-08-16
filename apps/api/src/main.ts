import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*', // Allow all origins
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Nestjs Boilerplate Monorepo Starter')
    .setDescription('The Nestjs Boilerplate API description')
    .setVersion('1.0')
    .addTag('nestjs-boilerplate')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  // Add helmet middleware
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
