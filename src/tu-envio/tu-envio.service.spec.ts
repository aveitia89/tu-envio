import { Test, TestingModule } from '@nestjs/testing';
import { TuEnvioService } from './tu-envio.service';

describe('TuEnvioService', () => {
  let service: TuEnvioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuEnvioService],
    }).compile();

    service = module.get<TuEnvioService>(TuEnvioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
