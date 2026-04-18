import { NestFactory } from '@nestjs/core'; 
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:5173',
        'https://pl4nificash.vercel.app',
        'https://pl4nificash-1.onrender.com', // develop
        'https://pl4nificash.onrender.com',   // main
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

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
