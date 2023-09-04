import { isRef, unref } from 'vue-demi'
import type { MaybeRefOrGetterDeep } from './types'

export const VUE_QUERY_CLIENT = 'VUE_QUERY_CLIENT'

function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

function toValue<T>(value: MaybeRefOrGetterDeep<T>): MaybeRefOrGetterDeep<T> {
  return isFunction(value) ? value() : unref(value)
}

export function getClientKey(key?: string) {
  const suffix = key ? `:${key}` : ''
  return `${VUE_QUERY_CLIENT}${suffix}`
}

export function updateState(
  state: Record<string, unknown>,
  update: Record<string, any>,
): void {
  Object.keys(state).forEach((key) => {
    state[key] = update[key]
  })
}

export function cloneDeep<T>(
  value: MaybeRefOrGetterDeep<T>,
  customizer?: (val: MaybeRefOrGetterDeep<T>) => T | undefined,
): T {
  if (customizer) {
    const result = customizer(value)
    // If it's a ref of undefined, return undefined
    if (result === undefined && (isRef(value) || isFunction(value))) {
      return result as T
    }
    if (result !== undefined) {
      return result
    }
  }

  if (Array.isArray(value)) {
    return value.map((val) => cloneDeep(val, customizer)) as unknown as T
  }

  if (typeof value === 'object' && isPlainObject(value)) {
    const entries = Object.entries(value).map(([key, val]) => [
      key,
      cloneDeep(val, customizer),
    ])
    return Object.fromEntries(entries)
  }

  return value as T
}

export function cloneDeepToValue<T>(obj: MaybeRefOrGetterDeep<T>): T {
  return cloneDeep(obj, (val) => {
    if (isRef(val) || isFunction(val)) {
      return cloneDeepToValue(toValue(val))
    }

    return undefined
  })
}

function isPlainObject(value: unknown): value is Object {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export function shouldThrowError<T extends (...args: Array<any>) => boolean>(
  throwOnError: boolean | T | undefined,
  params: Parameters<T>,
): boolean {
  // Allow throwOnError function to override throwing behavior on a per-error basis
  if (typeof throwOnError === 'function') {
    return throwOnError(...params)
  }

  return !!throwOnError
}
