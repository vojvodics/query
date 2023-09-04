import type { MaybeRefOrGetter } from 'vue-demi'

export type MaybeRefOrGetterDeep<T> = MaybeRefOrGetter<
  T extends Function
    ? T
    : T extends object
    ? {
        [Property in keyof T]: MaybeRefOrGetterDeep<T[Property]>
      }
    : T
>

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never
