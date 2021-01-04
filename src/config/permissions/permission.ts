import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Permission {

    @Field(() => String, { description: 'Nombre' })
    name: string;

    @Field(() => String, { description: 'Nombre legible' })
    humanName: string;

}
