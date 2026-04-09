import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //Elimina datos no requeridos
    forbidNonWhitelisted: true, //lanza error si hay propiedades adicionales
    transform: true, //convierte tipos de datos
  }));  
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
