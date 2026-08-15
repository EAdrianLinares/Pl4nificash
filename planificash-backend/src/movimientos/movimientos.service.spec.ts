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

  it('should compute pending summary for next month', async () => {
    const qb = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({
        ingresos: '500000',
        gastos: '200000',
      }),
    };

    Object.defineProperty(service, 'movimientoRepo', {
      value: {
        createQueryBuilder: jest.fn().mockReturnValue(qb),
      },
      writable: true,
    });

    const result = await service.getPendientesMesSiguiente('user-1');

    expect(result).toEqual({
      ingresos: 500000,
      gastos: 200000,
      neto: 300000,
      hayPendientes: true,
      desde: expect.any(String),
      hasta: expect.any(String),
    });
    expect(qb.where).toHaveBeenCalledWith('movimiento.user_id = :userId', { userId: 'user-1' });
    expect(qb.andWhere).toHaveBeenCalledWith('movimiento.fecha >= :desde', expect.any(Object));
    expect(qb.andWhere).toHaveBeenCalledWith('movimiento.fecha <= :hasta', expect.any(Object));
  });
});
