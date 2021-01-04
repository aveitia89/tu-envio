import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean } from 'class-validator';

@InputType()
export class Sorting {

    @Field({description: 'Select a valid field to sort.'})
    @IsString()
    selector: string;

    @Field({description: 'There is just two options: false for ASCENDENT | true for DESCENDENT'})
    @IsBoolean()
    desc: boolean;

}
