import { useQuery } from '../useQuery'

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false

export type Expect<T extends true> = T

class CustomError extends Error {
  constructor() {
    super()
  }

  isCustom = true
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: CustomError
  }
}

const query = useQuery({
  queryKey: ['test'],
  queryFn: () => {
    return 'test'
  },
  // onError: (error: string) => {

  // }
})
