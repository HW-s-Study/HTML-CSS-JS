import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Test Server API')
    .setDescription('프론트엔드 미니 프로젝트를 위한 테스트 백엔드')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Server running on http://localhost:${process.env.PORT ?? 8080}`);
  console.log(`Swagger UI: http://localhost:${process.env.PORT ?? 8080}/docs`);
}
bootstrap();
