import { cleanup } from '@testing-library/react'
import { flattenNames, getPartialValues } from './use-form'

afterEach(cleanup)

describe('flattenNames', () => {
  test('empty object returns empty array', () => {
    const inObj = {}
    const expArray: string[] = []
    const outArray = flattenNames(inObj)
    expect(JSON.stringify(outArray)).toEqual(JSON.stringify(expArray))
  })

  test('simple object returns array with single simple string', () => {
    const inObj = { a: 'a' }
    const expArray = ['a']
    const outArray = flattenNames(inObj)
    expect(JSON.stringify(outArray)).toEqual(JSON.stringify(expArray))
  })

  test('nested object returns array with single nested string', () => {
    const inObj = { a: { b: 'a.b' } }
    const expArray = ['a.b']
    const outArray = flattenNames(inObj)
    expect(JSON.stringify(outArray)).toEqual(JSON.stringify(expArray))
  })

  test('nested object with multiple strings returns array with nested string', () => {
    const inObj = { a: { b: { c: 'a.b.c' } }, d: { e: 'a.d.e' } }
    const expArray = ['a.b.c', 'a.d.e']
    const outArray = flattenNames(inObj)
    expect(JSON.stringify(outArray)).toEqual(JSON.stringify(expArray))
  })
})

describe('getPartialValues', () => {
  test('empty object and empty array returns empty object', () => {
    const inObj = {}
    const inArray: string[] = []
    const expObj = {}
    const outObj = getPartialValues(inObj, inArray)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test('empty object and empty array returns empty object', () => {
    const inObj = { a: 7 }
    const inArray = ['a']
    const expObj = { a: 7 }
    const outObj = getPartialValues(inObj, inArray)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test(`{ a: 7, b: 'hej', c: 23 } and ['a'] returns { a: 7 }`, () => {
    const inObj = { a: 7, b: 'hej', c: 23 }
    const inArray = ['a']
    const expObj = { a: 7 }
    const outObj = getPartialValues(inObj, inArray)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test(`{ a: 7, b: 'hej', c: 23 } and ['a', 'c'] returns { a: 7, c: 23 }`, () => {
    const inObj = { a: 7, b: 'hej', c: 23 }
    const inArray = ['a', 'c']
    const expObj = { a: 7, c: 23 }
    const outObj = getPartialValues(inObj, inArray)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test(`{ a: 7, b: {d: 'hej'}, c: 23 } and ['a', 'b.d'] returns { a: 7, b: {d: 'hej'} }`, () => {
    const inObj = { firstName: 'John', lastName: 'Doe', car: { brand: 'Tesla' } }
    const inArray = ['firstName', 'car.brand']
    const expObj = { firstName: 'John', car: { brand: 'Tesla' } }
    const outObj = getPartialValues(inObj, inArray)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
    expect(JSON.stringify(inArray)).toEqual(JSON.stringify(['firstName', 'car.brand']))
  })

  test(`expect in array parameter not to have changed`, () => {
    const inObj = { firstName: 'John', lastName: 'Doe', car: { brand: 'Tesla' } }
    const inArray = ['firstName', 'car.brand']
    getPartialValues(inObj, inArray)
    expect(JSON.stringify(inArray)).toEqual(JSON.stringify(['firstName', 'car.brand']))
  })

  test(`expect in object parameter not to have changed`, () => {
    const inObj = { firstName: 'John', lastName: 'Doe', car: { brand: 'Tesla' } }
    const inArray = ['firstName', 'car.brand']
    getPartialValues(inObj, inArray)
    expect(JSON.stringify(inObj)).toEqual(
      JSON.stringify({ firstName: 'John', lastName: 'Doe', car: { brand: 'Tesla' } })
    )
  })
})
