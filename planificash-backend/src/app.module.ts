import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { MovimientosModule } from './movimientos/movimientos.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovimientosRecurrentesModule } from './movimientos-recurrentes/movimientos-recurrentes.module';

@Module({
  imports: [
    // Cargar variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`, '.env'],
    }),

    // Conexión a la base de datos (PostgreSQL/Supabase)
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),

    // Módulos de la aplicación
    UsuariosModule,
    AuthModule,
    MovimientosModule,
    MovimientosRecurrentesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
