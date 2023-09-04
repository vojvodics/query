import { QueryCache as QC } from '@tanstack/query-core'
import { cloneDeepToValue } from './utils'
import type {
  DefaultError,
  Query,
  QueryFilters,
  WithRequired,
} from '@tanstack/query-core'
import type { MaybeRefOrGetterDeep } from './types'

export class QueryCache extends QC {
  find<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData>(
    filters: MaybeRefOrGetterDeep<WithRequired<QueryFilters, 'queryKey'>>,
  ): Query<TQueryFnData, TError, TData> | undefined {
    return super.find(cloneDeepToValue(filters))
  }

  findAll(filters: MaybeRefOrGetterDeep<QueryFilters> = {}): Array<Query> {
    return super.findAll(cloneDeepToValue(filters))
  }
}
