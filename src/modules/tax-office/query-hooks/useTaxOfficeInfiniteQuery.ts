import { AxiosError } from 'axios';
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import axios from 'src/utils/axios';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

import { GetTaxOfficeHandlerBodyInput, GetTaxOfficeHandlerResponse } from '../handlers/getTaxOfficesHandler';
import { TAX_OFFICE_QUERY_KEY } from './taxOfficeQueryKey';

export type UseTaxOfficeInfiniteQueryValue = GetTaxOfficeHandlerResponse;
export type UseTaxOfficeInfiniteQueryInput = Omit<GetTaxOfficeHandlerBodyInput, 'page'>;
export type UseTaxOfficeInfiniteQueryError = AxiosError<SimpleError>;

const useTaxOfficeInfiniteQuery = (
  params?: UseTaxOfficeInfiniteQueryInput,
  options?: UseInfiniteQueryOptions<UseTaxOfficeInfiniteQueryValue, SimpleError>
): UseInfiniteQueryResult<UseTaxOfficeInfiniteQueryValue, SimpleError> => {
  return useInfiniteQuery(
    [TAX_OFFICE_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, number | undefined>) => {
      const axiosParams: GetTaxOfficeHandlerBodyInput = {
        limit: params?.limit ?? 100,
        page: pageParam ?? 0,
        q: params?.q,
        orderBy: params?.orderBy,
      };
      const response = await axios.get<GetTaxOfficeHandlerResponse>(`/api/tax-office`, {
        params: axiosParams,
      });

      return response.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.nextPageParams || undefined,
      ...options,
    }
  );
};

export default useTaxOfficeInfiniteQuery;
