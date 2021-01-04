import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class IdsDTO {

    @Field(() => [String], { description: 'Listado de identificadores únicos.' })
    ids: string[];

}
