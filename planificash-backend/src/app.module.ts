import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { MovimientosModule } from './movimientos/movimientos.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Cargar variables de entorno (.env)
    ConfigModule.forRoot({
      isGlobal: true, // disponible en toda la app
    }),

    //Conexión a la base de datos (dinámica)
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,
        synchronize: false, // SIEMPRE false en producción
      }),
    }),

    // 🔹 3. Módulos de tu aplicación
    UsuariosModule,
    AuthModule,
    MovimientosModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
