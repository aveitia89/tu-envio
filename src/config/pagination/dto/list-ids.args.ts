import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class ListIdsDTO {

    @Field(() => [Int], { description: 'Listado de identificadores únicos.' })
    ids: string[];

}
