import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://pl4nificash.vercel.app',
      ],
      credentials: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  console.log('🔥 BACKEND CORRIENDO');

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
