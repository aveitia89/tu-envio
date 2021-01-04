import {GraphQLClient} from 'graphql-request';

export const MAX_ELEMENTS_FOR_REPORTS = 999999;

export function parseDTO(filter: any) {
    const where = {};
    Object.keys(filter).forEach(key => {
        where[key] = filter[key];
    });
    return where;
}

export async function requestApi(endpoint, query, headers, variables) {
    try {
        const client = new GraphQLClient(endpoint, {
            headers: headers,
            //credentials: 'include',
            mode: 'cors',
        });
        return await client.request(query, variables);
    } catch (error) {
        throw error;
    }
}

/**
 * Check if the data has been delete 5 years ago in order to deleted permanently.
 *
 * @param date
 */
export function canDelete(date: Date) {
    /*const DATA_LIVE_TIME: number = 1826;  // 5 years = 1826 days
    const elapsedTime = differenceDates(date, new Date());
    if (elapsedTime > DATA_LIVE_TIME) {
      return true;
    }
    return false;*/
}
