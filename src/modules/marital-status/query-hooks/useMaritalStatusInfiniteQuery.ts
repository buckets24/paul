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

import { GetMaritalStatusHandlerBodyInput, GetMaritalStatusHandlerResponse } from '../handlers/getMaritalStatusHandler';
import { MARITAL_STATUS_QUERY_KEY } from './maritalStatusQuerykey';

export type UseMaritalStatusInfiniteQueryValue = GetMaritalStatusHandlerResponse;
export type UseMaritalStatusInfiniteQueryInput = Omit<GetMaritalStatusHandlerBodyInput, 'page'>;
export type UseMaritalStatusInfiniteQueryError = AxiosError<SimpleError>;

const useMaritalStatusInfiniteQuery = (
  params?: UseMaritalStatusInfiniteQueryInput,
  options?: UseInfiniteQueryOptions<UseMaritalStatusInfiniteQueryValue, SimpleError>
): UseInfiniteQueryResult<UseMaritalStatusInfiniteQueryValue, SimpleError> => {
  return useInfiniteQuery(
    [MARITAL_STATUS_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, number | undefined>) => {
      const axiosParams: GetMaritalStatusHandlerBodyInput = {
        limit: params?.limit,
        page: pageParam ?? 0,
        q: params?.q,
        orderBy: params?.orderBy,
      };
      const response = await axios.get<GetMaritalStatusHandlerResponse>(`/api/marital-status`, {
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

export default useMaritalStatusInfiniteQuery;
