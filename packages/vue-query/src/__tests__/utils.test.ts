import { reactive, ref } from 'vue-demi'
import { cloneDeep, cloneDeepToValue, updateState } from '../utils'

describe('utils', () => {
  describe('updateState', () => {
    test('should update first object with values from the second one', () => {
      const origin = { option1: 'a', option2: 'b', option3: 'c' }
      const update = { option1: 'x', option2: 'y', option3: 'z' }
      const expected = { option1: 'x', option2: 'y', option3: 'z' }

      updateState(origin, update)
      expect(origin).toEqual(expected)
    })

    test('should update only existing keys', () => {
      const origin = { option1: 'a', option2: 'b' }
      const update = { option1: 'x', option2: 'y', option3: 'z' }
      const expected = { option1: 'x', option2: 'y' }

      updateState(origin, update)
      expect(origin).toEqual(expected)
    })

    test('should remove non existing keys', () => {
      const origin = { option1: 'a', option2: 'b', option3: 'c' }
      const update = { option1: 'x', option2: 'y' }
      const expected = { option1: 'x', option2: 'y' }

      updateState(origin, update)
      expect(origin).toEqual(expected)
    })
  })

  describe('cloneDeep', () => {
    test('should copy primitives and functions AS-IS', () => {
      expect(cloneDeep(3456)).toBe(3456)
      expect(cloneDeep('theString')).toBe('theString')
      expect(cloneDeep(null)).toBe(null)
    })

    test('should copy Maps and Sets AS-IS', () => {
      const setVal = new Set([3, 4, 5])
      const setValCopy = cloneDeep(setVal)
      expect(setValCopy).toBe(setVal)
      expect(setValCopy).toStrictEqual(new Set([3, 4, 5]))

      const mapVal = new Map([
        ['a', 'aVal'],
        ['b', 'bVal'],
      ])
      const mapValCopy = cloneDeep(mapVal)
      expect(mapValCopy).toBe(mapVal)
      expect(mapValCopy).toStrictEqual(
        new Map([
          ['a', 'aVal'],
          ['b', 'bVal'],
        ]),
      )
    })

    test('should deeply copy arrays', () => {
      const val = [
        25,
        'str',
        null,
        new Set([3, 4]),
        [5, 6, { a: 1 }],
        undefined,
      ]
      const cp = cloneDeep(val)
      expect(cp).toStrictEqual([
        25,
        'str',
        null,
        new Set([3, 4]),
        [5, 6, { a: 1 }],
        undefined,
      ])
      expect(cp).not.toBe(val)
      expect(cp[3]).toBe(val[3]) // Set([3, 4])
      expect(cp[4]).not.toBe(val[4]) // [5, 6, { a: 1 }]
      expect((cp[4] as Array<number>)[2]).not.toBe((val[4] as Array<number>)[2]) // { a : 1 }
    })

    test('should deeply copy object', () => {
      const val = reactive({
        a: 25,
        b: 'str',
        c: null,
        d: undefined,
        e: new Set([5, 6]),
        f: [3, 4],
        g: { fa: 26 },
      })
      const cp = cloneDeep(val)

      expect(cp).toStrictEqual({
        a: 25,
        b: 'str',
        c: null,
        d: undefined,
        e: new Set([5, 6]),
        f: [3, 4],
        g: { fa: 26 },
      })

      expect(cp.e).toBe(val.e) // Set
      expect(cp.f).not.toBe(val.f) // []
      expect(cp.g).not.toBe(val.g) // {}
    })
  })

  describe('cloneDeepToValue', () => {
    test('should normalize primitives', () => {
      expect(cloneDeepToValue(ref(34))).toBe(34)
      expect(cloneDeepToValue(ref('mystr'))).toBe('mystr')
      expect(cloneDeepToValue(() => 42)).toBe(42)
      expect(cloneDeepToValue(() => 'mystr')).toBe('mystr')
    })

    test('should deeply normalize arrays', () => {
      const arr = [
        2,
        3,
        ref(4),
        ref('5'),
        { a: ref(6) },
        [ref(7)],
        () => 8,
        () => '9',
        () => [10],
        () => ({ a: 11 }),
      ]
      const refVal = ref(arr)
      const getterVal = () => arr
      expect(cloneDeepToValue(refVal)).toStrictEqual([
        2,
        3,
        4,
        '5',
        { a: 6 },
        [7],
        8,
        '9',
        [10],
        { a: 11 },
      ])
      expect(cloneDeepToValue(getterVal)).toStrictEqual(
        cloneDeepToValue(refVal),
      )
    })

    test('should deeply normalize objects', () => {
      const val = ref({
        a: 1,
        b: ref(2),
        c: [ref('c1'), ref(['c2'])],
        d: {
          e: ref('e'),
        },
        f: () => 'f',
        g: [() => 'g1', () => 'g2'],
        h: {
          i: () => 'i',
        },
      })
      const cp = cloneDeepToValue(val)

      expect(cp).toEqual({
        a: 1,
        b: 2,
        c: ['c1', ['c2']],
        d: { e: 'e' },
        f: 'f',
        g: ['g1', 'g2'],
        h: { i: 'i' },
      })
    })

    test('should normalize undefined', () => {
      expect(cloneDeepToValue(ref(undefined))).toBe(undefined)
      expect(cloneDeepToValue(() => undefined)).toBe(undefined)
    })
  })
})
