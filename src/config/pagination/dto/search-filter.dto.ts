import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SearchFilter {

    @Field()
    @IsString()
    field: string;

    @Field()
    @IsString()
    operation: string;

    @Field()
    @IsString()
    value: string;
}
