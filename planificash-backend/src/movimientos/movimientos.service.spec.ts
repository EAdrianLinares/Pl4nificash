import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosService } from './movimientos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

describe('MovimientosService', () => {
  let service: MovimientosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimientosService,
        { provide: getRepositoryToken(Movimiento), useValue: {} },
        { provide: getRepositoryToken(Usuarios), useValue: {} },
      ],
    }).compile();

    service = module.get<MovimientosService>(MovimientosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
