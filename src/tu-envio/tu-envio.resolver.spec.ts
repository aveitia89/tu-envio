import { Test, TestingModule } from '@nestjs/testing';
import { TuEnvioResolver } from './tu-envio.resolver';

describe('TuEnvioResolver', () => {
  let resolver: TuEnvioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuEnvioResolver],
    }).compile();

    resolver = module.get<TuEnvioResolver>(TuEnvioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
