import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { MovimientosModule } from './movimientos/movimientos.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',          // cambia si es diferente
      password: '',        // tu contraseña
      database: 'planificash',   // tu base de datos
      autoLoadEntities: true,
      synchronize: false, // 🔴 MUY IMPORTANTE
    }),
    UsuariosModule, 
    AuthModule, 
    MovimientosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
