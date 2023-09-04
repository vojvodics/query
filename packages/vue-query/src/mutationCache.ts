import { MutationCache as MC } from '@tanstack/query-core'
import { cloneDeepToValue } from './utils'
import type {
  DefaultError,
  Mutation,
  MutationFilters,
} from '@tanstack/query-core'
import type { MaybeRefOrGetterDeep } from './types'

export class MutationCache extends MC {
  find<
    TData = unknown,
    TError = DefaultError,
    TVariables = any,
    TContext = unknown,
  >(
    filters: MaybeRefOrGetterDeep<MutationFilters>,
  ): Mutation<TData, TError, TVariables, TContext> | undefined {
    return super.find(cloneDeepToValue(filters))
  }

  findAll(
    filters: MaybeRefOrGetterDeep<MutationFilters> = {},
  ): Array<Mutation> {
    return super.findAll(cloneDeepToValue(filters))
  }
}
