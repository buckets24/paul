import { Prisma } from '@prisma/client';
import { IsInterface, isNumber, isOptional, isString, TypeGuard } from 'generic-type-guard';

/**
 * TODO Not the best typings
 */

export interface ServicePaginatedParams<O extends { [key: string]: Prisma.SortOrder }> {
  limit?: number;
  page: number;
  orderBy?: O;
  q?: string;
}

/**
 * A helper function that makes sure that the correct ServicePaginatedParams is passed to an endpoint for service functions to handle.
 * @param params Any object
 * @returns Boolean with Type predicate. It asserts that params is a { limit: number, page: number, q: string | undefined }
 */
// TODO Remove any here
export const isServicePaginatedParams: TypeGuard<ServicePaginatedParams<any>> = new IsInterface()
  .withProperties({
    limit: isOptional(isNumber),
    page: isNumber,
    q: isOptional(isString),
  })
  .get();
