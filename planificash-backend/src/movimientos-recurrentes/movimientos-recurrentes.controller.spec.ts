import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosRecurrentesController } from './movimientos-recurrentes.controller';

describe('MovimientosRecurrentesController', () => {
  let controller: MovimientosRecurrentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimientosRecurrentesController],
    }).compile();

    controller = module.get<MovimientosRecurrentesController>(MovimientosRecurrentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
