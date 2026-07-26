import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovimientoRecurrente } from './entities/movimiento-recurrente.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';
import { MovimientosService } from '../movimientos/movimientos.service';

describe('MovimientosRecurrentesService', () => {
  let service: MovimientosRecurrentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimientosRecurrentesService,
        { provide: getRepositoryToken(MovimientoRecurrente), useValue: {} },
        { provide: getRepositoryToken(Usuarios), useValue: {} },
        {
          provide: MovimientosService,
          useValue: {
            findByUsuario: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovimientosRecurrentesService>(MovimientosRecurrentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
