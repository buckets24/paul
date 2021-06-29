import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export async function queryKeyFetcher<T>(context: QueryFunctionContext<string, unknown>): Promise<T> {
  const res = await axios.get<T>(context.queryKey[0]);
  return res.data;
}
