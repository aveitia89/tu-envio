import {IsNumber, IsOptional} from 'class-validator';
import {Field, InputType, Int} from '@nestjs/graphql';
import {SearchFilter} from './search-filter.dto';
import {Sorting} from './sorting.dto';
import {ISelect} from './select.inteface';

@InputType()
export class PaginateDTO {

    /**
     * Amount of elements to skip
     */
    @Field(() => Int!, {
        description: 'Cantidad de páginas a saltar (0 por defecto).',
        nullable: true, defaultValue: 0
    })
    @IsNumber()
    skip?: number;

    /**
     * Amount of elements to take
     */
    @Field(() => Int!, {
        description: 'Cantidad de elementos a obtener de la página seleccionada (10 por defecto).',
        nullable: true, defaultValue: 10
    })
    @IsNumber()
    take?: number;

    /**
     * Search AND filters
     */
    @Field(() => [SearchFilter], {description: 'Campos válidos para filtrar por AND', nullable: true})
    searchFields?: SearchFilter[];

    /**
     * Search OR filters
     */
    @Field(() => [SearchFilter], {description: 'Campos válidos para filtrar por OR', nullable: true})
    orSearchFields?: SearchFilter[];

    /**
     * Campo a ordenar
     */
    @Field(() => Sorting, {description: 'Campo para ordenar', nullable: true})
    sortField?: Sorting;

    @Field(() => [ISelect], {nullable: true})
    select?: ISelect[];

    @Field(() => Boolean, {nullable: true})
    reports?: boolean;

}
