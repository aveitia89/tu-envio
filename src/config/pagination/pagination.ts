import { SelectQueryBuilder } from 'typeorm';
import { SearchFilter } from './dto/search-filter.dto';
import { Sorting } from './dto/sorting.dto';
import { ISelect } from './dto/select.inteface';

export class Pagination {

  /**
   * @author: Daniel Alvarez Goenaga
   * @description: Tiene la responsibilidad de realizar búsqueda habilitando la paginación, orden y filtrado.
   * @contributors: lmperez
   * @param searchFilters
   * @param skip
   * @param take
   * @param repository
   * @param sortBy
   * @param sqb
   * @param searchFiltersOr
   * @param select
   */
  static async paginate(
    skip: number = 0,
    take: number = 10,
    searchFilters: SearchFilter[] | null = [],
    sortBy: Sorting | null,
    sqb: SelectQueryBuilder<any>,
    searchFiltersOr: SearchFilter[] | null = [],
    select: ISelect[] = [],
    reports?: boolean,
  ): Promise<any> {
    const limit = (take <= 100 || reports) ? Math.min(take, 1000000) : 100;
    const filters = searchFilters.map((filter: SearchFilter) => this.generateFilter(filter));
    const [where1, params1] = this.getWhere(filters);
    let where = where1
    let params = params1
    // BEGIN 1: Just for testing purpose
    if (searchFiltersOr && searchFiltersOr.length > 0) {
      const orFilters = searchFiltersOr.map((filter: SearchFilter) => this.generateFilter(filter));
      const [where2, params2] = this.getWhere(orFilters, true);
      if (where !== '') where = `(${where}) and `
      where += `(${where2})`
      Object.keys(params2).forEach(x => {
        params[x] = params2[x]
      })
    }
    if (sortBy) sqb = sqb.orderBy(sortBy?.selector, (sortBy?.desc === true) ? 'DESC' : 'ASC')
    // END 1
    this.addSelect(sqb, select)
    const [items, count] = await sqb
      .where(where, params)
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    return { skip, take, count, items };
  }

  /**
   * Prepare the where expression for typeorm
   *
   * @param filters the array of filters
   * @param or true|false determine the where type or|and
   */
  static getWhere(filters: SearchFilter[], or?: boolean): any {
    let where: string = '';
    const params = {};
    let hash = 1;
    for (const filter of filters) {
      if (where !== '') { where = `${where} ${(or && or === true) ? 'or' : 'and'} `; }
      if (filter.operation.toUpperCase() === 'IN') {
        where = `${where} ${filter.field} In(${filter.value})`;
      } else if (filter.operation.toUpperCase() === 'NOT IN') {
        where = `${where} ${filter.field} not In(${filter.value})`;
      } else {
        where = `${where} ${filter.field} ${filter.operation} :${filter.field.replace('.', '')}${hash}`;
        params[`${filter.field.replace('.', '')}${hash}`] = filter.value;
        hash++;
      }
    }
    return [where, params];
  }

  private static addSelect(sqb: SelectQueryBuilder<any>, select: ISelect[]) {
    for (const s of select) {
      sqb = sqb.leftJoinAndSelect(s.key, s.alias)
    }
  }

  /**
   * @author: Daniel Alvarez Goenaga
   * @description: Tiene la responsibilidad de generar los filtros dada su operación.
   * @contributors: lmperez
   * @param filter
   */
  private static generateFilter(filter: SearchFilter): SearchFilter {
    switch (filter.operation.toLowerCase()) {
      case 'contains':
        return { field: filter.field, operation: 'ILIKE', value: `%${filter.value}%` };
      case 'notcontains':
        return { field: filter.field, operation: 'NOT ILIKE', value: `%${filter.value}%` };
      case 'startswith':
        return { field: filter.field, operation: 'ILIKE', value: `${filter.value}%` };
      case 'endswith':
        return { field: filter.field, operation: 'ILIKE', value: `%${filter.value}` };
      case '=':
        return { field: filter.field, operation: '=', value: filter.value };
      case '<>':
        return { field: filter.field, operation: '<>', value: filter.value };
      case '>':
        return { field: filter.field, operation: '>', value: filter.value };
      case '>=':
        return { field: filter.field, operation: '>=', value: filter.value };
      case '<':
        return { field: filter.field, operation: '<', value: filter.value };
      case '<=':
        return { field: filter.field, operation: '<=', value: filter.value };
      case 'in':
        const v = filter.value.split(',').map(x => `'${x.trim()}'`).toLocaleString();
        return { field: filter.field, operation: 'IN', value: v };
      case 'notin':
        const v2 = filter.value.split(',').map(x => `'${x.trim()}'`).toLocaleString();
        return { field: filter.field, operation: 'NOT IN', value: v2 };
    }
  }

}
