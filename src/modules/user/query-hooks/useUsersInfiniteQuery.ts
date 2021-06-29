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

import { GetUsersHandlerBodyInput, GetUsersHandlerResponse } from '../handlers/getUsersHandler';
import { USERS_QUERY_KEY } from './usersQueryKeys';

export type UseUsersInfiniteQueryValue = GetUsersHandlerResponse;
export type UseUsersInfiniteQueryInput = Omit<GetUsersHandlerBodyInput, 'page'>;
export type UseUsersInfiniteQueryError = AxiosError<SimpleError>;

const useUsersInfiniteQuery = (
  params?: UseUsersInfiniteQueryInput, // We restrict the hooks from manually getting a page.
  options?: UseInfiniteQueryOptions<UseUsersInfiniteQueryValue, SimpleError>
): UseInfiniteQueryResult<UseUsersInfiniteQueryValue, SimpleError> => {
  return useInfiniteQuery(
    [USERS_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, number | undefined>) => {
      const axiosParams: GetUsersHandlerBodyInput = {
        limit: params?.limit,
        page: pageParam ?? 0,
        q: params?.q,
        orderBy: params?.orderBy,
      };
      const response = await axios.get<GetUsersHandlerResponse>(`/api/users`, {
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

export default useUsersInfiniteQuery;
