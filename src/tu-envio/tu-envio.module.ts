import { Module } from '@nestjs/common';
import { TuEnvioService } from './tu-envio.service';
import { TuEnvioResolver } from './tu-envio.resolver';

@Module({
    providers: [TuEnvioService, TuEnvioResolver],
    exports: [TuEnvioService],
})
export class TuEnvioModule {}
