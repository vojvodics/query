import { ref } from 'vue-demi'
import { QueryClient as QC } from '@tanstack/query-core'
import { cloneDeepToValue } from './utils'
import { QueryCache } from './queryCache'
import { MutationCache } from './mutationCache'
import type { MaybeRefOrGetterDeep } from './types'
import type {
  CancelOptions,
  DefaultError,
  DefaultOptions,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InfiniteData,
  InvalidateOptions,
  InvalidateQueryFilters,
  MutationFilters,
  MutationKey,
  MutationObserverOptions,
  QueryClientConfig,
  QueryFilters,
  QueryKey,
  QueryObserverOptions,
  QueryState,
  RefetchOptions,
  RefetchQueryFilters,
  ResetOptions,
  SetDataOptions,
  Updater,
} from '@tanstack/query-core'

export class QueryClient extends QC {
  constructor(config: MaybeRefOrGetterDeep<QueryClientConfig> = {}) {
    const unreffedConfig = cloneDeepToValue(config)
    const vueQueryConfig: QueryClientConfig = {
      defaultOptions: unreffedConfig.defaultOptions,
      queryCache: unreffedConfig.queryCache || new QueryCache(),
      mutationCache: unreffedConfig.mutationCache || new MutationCache(),
    }
    super(vueQueryConfig)
  }

  isRestoring = ref(false)

  isFetching(filters: MaybeRefOrGetterDeep<QueryFilters> = {}): number {
    return super.isFetching(cloneDeepToValue(filters))
  }

  isMutating(filters: MaybeRefOrGetterDeep<MutationFilters> = {}): number {
    return super.isMutating(cloneDeepToValue(filters))
  }

  getQueryData<TData = unknown>(
    queryKey: MaybeRefOrGetterDeep<QueryKey>,
  ): TData | undefined {
    return super.getQueryData(cloneDeepToValue(queryKey))
  }

  getQueriesData<TData = unknown>(
    filters: MaybeRefOrGetterDeep<QueryFilters>,
  ): Array<[QueryKey, TData | undefined]> {
    return super.getQueriesData(cloneDeepToValue(filters))
  }

  setQueryData<TData>(
    queryKey: MaybeRefOrGetterDeep<QueryKey>,
    updater: Updater<TData | undefined, TData | undefined>,
    options: MaybeRefOrGetterDeep<SetDataOptions> = {},
  ): TData | undefined {
    return super.setQueryData(
      cloneDeepToValue(queryKey),
      updater,
      cloneDeepToValue(options),
    )
  }

  setQueriesData<TData>(
    filters: MaybeRefOrGetterDeep<QueryFilters>,
    updater: Updater<TData | undefined, TData | undefined>,
    options: MaybeRefOrGetterDeep<SetDataOptions> = {},
  ): Array<[QueryKey, TData | undefined]> {
    return super.setQueriesData(
      cloneDeepToValue(filters),
      updater,
      cloneDeepToValue(options),
    )
  }

  getQueryState<TData = unknown, TError = DefaultError>(
    queryKey: MaybeRefOrGetterDeep<QueryKey>,
  ): QueryState<TData, TError> | undefined {
    return super.getQueryState(cloneDeepToValue(queryKey))
  }

  removeQueries(filters: MaybeRefOrGetterDeep<QueryFilters> = {}): void {
    return super.removeQueries(cloneDeepToValue(filters))
  }

  resetQueries(
    filters: MaybeRefOrGetterDeep<QueryFilters> = {},
    options: MaybeRefOrGetterDeep<ResetOptions> = {},
  ): Promise<void> {
    return super.resetQueries(
      cloneDeepToValue(filters),
      cloneDeepToValue(options),
    )
  }

  cancelQueries(
    filters: MaybeRefOrGetterDeep<QueryFilters> = {},
    options: MaybeRefOrGetterDeep<CancelOptions> = {},
  ): Promise<void> {
    return super.cancelQueries(
      cloneDeepToValue(filters),
      cloneDeepToValue(options),
    )
  }

  invalidateQueries(
    filters: MaybeRefOrGetterDeep<InvalidateQueryFilters> = {},
    options: MaybeRefOrGetterDeep<InvalidateOptions> = {},
  ): Promise<void> {
    return super.invalidateQueries(
      cloneDeepToValue(filters),
      cloneDeepToValue(options),
    )
  }

  refetchQueries(
    filters: MaybeRefOrGetterDeep<RefetchQueryFilters> = {},
    options: MaybeRefOrGetterDeep<RefetchOptions> = {},
  ): Promise<void> {
    return super.refetchQueries(
      cloneDeepToValue(filters),
      cloneDeepToValue(options),
    )
  }

  fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): Promise<TData>
  fetchQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefOrGetterDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    >,
  ): Promise<TData> {
    return super.fetchQuery(cloneDeepToValue(options))
  }

  prefetchQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  ): Promise<void>
  prefetchQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: MaybeRefOrGetterDeep<
      FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    >,
  ): Promise<void> {
    return super.prefetchQuery(cloneDeepToValue(options))
  }

  fetchInfiniteQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: FetchInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
  ): Promise<InfiniteData<TData, TPageParam>>
  fetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefOrGetterDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >,
  ): Promise<InfiniteData<TData, TPageParam>> {
    return super.fetchInfiniteQuery(cloneDeepToValue(options))
  }

  prefetchInfiniteQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: FetchInfiniteQueryOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >,
  ): Promise<void>
  prefetchInfiniteQuery<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
  >(
    options: MaybeRefOrGetterDeep<
      FetchInfiniteQueryOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryKey,
        TPageParam
      >
    >,
  ): Promise<void> {
    return super.prefetchInfiniteQuery(cloneDeepToValue(options))
  }

  setDefaultOptions(options: MaybeRefOrGetterDeep<DefaultOptions>): void {
    super.setDefaultOptions(cloneDeepToValue(options))
  }

  setQueryDefaults(
    queryKey: MaybeRefOrGetterDeep<QueryKey>,
    options: MaybeRefOrGetterDeep<
      Omit<QueryObserverOptions<unknown, any, any, any>, 'queryKey'>
    >,
  ): void {
    super.setQueryDefaults(
      cloneDeepToValue(queryKey),
      cloneDeepToValue(options),
    )
  }

  getQueryDefaults(
    queryKey: MaybeRefOrGetterDeep<QueryKey>,
  ): QueryObserverOptions<any, any, any, any, any> {
    return super.getQueryDefaults(cloneDeepToValue(queryKey))
  }

  setMutationDefaults(
    mutationKey: MaybeRefOrGetterDeep<MutationKey>,
    options: MaybeRefOrGetterDeep<MutationObserverOptions<any, any, any, any>>,
  ): void {
    super.setMutationDefaults(
      cloneDeepToValue(mutationKey),
      cloneDeepToValue(options),
    )
  }

  getMutationDefaults(
    mutationKey: MaybeRefOrGetterDeep<MutationKey>,
  ): MutationObserverOptions<any, any, any, any> {
    return super.getMutationDefaults(cloneDeepToValue(mutationKey))
  }
}
