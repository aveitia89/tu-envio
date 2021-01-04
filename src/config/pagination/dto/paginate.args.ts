import { Field, Int, ArgsType } from '@nestjs/graphql';
import { SearchFilter } from './search-filter.dto';
import { Sorting } from './sorting.dto';

@ArgsType()
export class PaginateArgs {

  @Field(() => Int!, { description: 'Cantidad de páginas a saltar (0 por defecto).', nullable: true })
  skip: number;

  @Field(() => Int!, {
    description: 'Cantidad de elementos a obtener de la página seleccionada (10 por defecto).',
    nullable: true,
  })
  take: number;

  @Field(() => [SearchFilter], { description: 'Listado de campos filtrados', nullable: true })
  searchFields: SearchFilter[];

  @Field(() => Sorting, { description: 'Campo por el cual ordenar', nullable: true })
  sortField?: Sorting;

  @Field(() => Boolean, {
    description: 'Ignora el límite máximo de 100 elementos.', nullable: true,
    deprecationReason: 'Sobrecarga la red una cantidad importante de datos que el cliente no necesita',
  })
  reports?: boolean;
}
