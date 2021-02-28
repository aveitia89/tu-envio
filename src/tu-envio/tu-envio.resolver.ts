import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginateOutDTO } from 'src/config/pagination/dto/paginate-out.dto';
import { PaginateDTO } from 'src/config/pagination/dto/paginate.dto';
import { TuEnvioService } from './tu-envio.service';

@Resolver()
export class TuEnvioResolver {
    constructor(
        private readonly tuEnvioService: TuEnvioService,
    ) { }

    @Query(type => String, { description: 'Scraping para tu envio' })
    async tuEnvio(@Args('url') url: string): Promise<String> {
        const tuEnvio = await this.tuEnvioService.getTuEnvio(url);
        return tuEnvio.data;     
    }
}
