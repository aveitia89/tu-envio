import { InputType, Field } from '@nestjs/graphql';

/**
 * @interface ISelect used for typeorm selection
 */
@InputType()
export class ISelect {

    /**
     * key = alias.fieldName
     */
    @Field()
    key: string

    /**
     * new key alias
     */
    @Field()
    alias: string

}
