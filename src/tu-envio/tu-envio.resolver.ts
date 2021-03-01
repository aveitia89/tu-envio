import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

    @Mutation(type => String, { description: 'Scraping para tu envio' })
    async tuEnvioLogin(
        @Args('url') url: string,
        @Args('user') user: string,
        @Args('pass') pass: string,
    ): Promise<String> {
        const tuEnvio = await this.tuEnvioService.login(url, user, pass);
        return tuEnvio;
    }
}
