import type { QueryClient, QueryKey } from '@tanstack/query-core'
import { QueryObserver } from '@tanstack/query-core'
import { DefaultError } from '@tanstack/react-query'
import type {
  DefinedUseQueryResult,
  UseQueryOptions,
  UseQueryResult,
} from './types'
import { useBaseQuery } from './useBaseQuery'

export function useQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TInitialData extends
    | undefined // Undefined cases
    | (() => undefined)
    | (() => TQueryFnData | undefined)
    | TQueryFnData // Defined cases
    | (() => TQueryFnData) = undefined,
>(
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'initialData'
  > & {
    initialData?: TInitialData
  },
  queryClient?: QueryClient,
): undefined extends TInitialData
  ? UseQueryResult<TData, TError>
  : TInitialData extends () => infer TReturn
  ? undefined extends TReturn
    ? UseQueryResult<TData, TError>
    : DefinedUseQueryResult<TData, TError>
  : DefinedUseQueryResult<TData, TError> {
  return useBaseQuery(options, QueryObserver, queryClient) as any
}

// export function useQuery<
//   TQueryFnData = unknown,
//   TError = Error,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
//   TOptions extends UseQueryOptions<
//     TQueryFnData,
//     TError,
//     TData,
//     TQueryKey
//   > = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
// >(
//   options: TOptions,
//   queryClient?: QueryClient,
// ): undefined extends TOptions['initialData']
//   ? UseQueryResult<TData, TError>
//   : TOptions['initialData'] extends () => infer TReturn
//   ? undefined extends TReturn
//     ? UseQueryResult<TData, TError>
//     : DefinedUseQueryResult<TData, TError>
//   : DefinedUseQueryResult<TData, TError> {
//   return useBaseQuery(options, QueryObserver, queryClient) as any
// }
