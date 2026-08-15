import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosController } from './movimientos.controller';
import { MovimientosService } from './movimientos.service';

describe('MovimientosController', () => {
  let controller: MovimientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientosController],
      providers: [
        {
          provide: MovimientosService,
          useValue: {
            create: jest.fn(),
            findByMonth: jest.fn(),
            findAllByUser: jest.fn(),
            getDisponibleActual: jest.fn(),
            getPendientesMesSiguiente: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovimientosController>(MovimientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should expose pending summary for the next month', async () => {
    const service = controller['movimientosService'] as any;
    const result = {
      ingresos: 500000,
      gastos: 200000,
      neto: 300000,
      hayPendientes: true,
      desde: '2026-08-16',
      hasta: '2026-09-30',
    };

    service.getPendientesMesSiguiente.mockResolvedValue(result);

    await expect(
      controller.getPendientesMesSiguiente({ user: { userId: 'user-1' } }),
    ).resolves.toEqual(result);
  });
});
