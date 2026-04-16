import { Test, TestingModule } from '@nestjs/testing';
import { MovimientosRecurrentesService } from './movimientos-recurrentes.service';

describe('MovimientosRecurrentesService', () => {
  let service: MovimientosRecurrentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimientosRecurrentesService],
    }).compile();

    service = module.get<MovimientosRecurrentesService>(MovimientosRecurrentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
