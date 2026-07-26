import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosRecurrentesController } from './movimientos-recurrentes.controller';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';

describe('MovimientosRecurrentesController', () => {
  let controller: MovimientosRecurrentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientosRecurrentesController],
      providers: [
        {
          provide: MovimientosRecurrentesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            aplicarMes: jest.fn(),
            aplicarRecurrenteIndividual: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovimientosRecurrentesController>(MovimientosRecurrentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
