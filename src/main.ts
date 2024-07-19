import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // app init
  const app = await NestFactory.create(AppModule);
  // swagger init
  const swaggerConfig = new DocumentBuilder().setTitle('Tasks Management').setVersion('1.0').build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api', app, swaggerDocument);
  // app listener
  await app.listen(process.env.APP_PORT);
}

bootstrap().then(() => {});
