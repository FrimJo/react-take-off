import { cleanup } from '@testing-library/react'
import getNamesForObject from './get-names-for-object'

afterEach(cleanup)

describe('', () => {
  test('empty object returns empty object', () => {
    const inObj = {}
    const expObj = {}
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test("{ test: 7 } retuns { test: 'test' }", () => {
    const inObj = { test: 7 }
    const expObj = { test: 'test' }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test("{ A: {} } retuns { A: 'A' }", () => {
    const inObj = { A: {} }
    const expObj = { A: 'A' }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test("{ A: { B: 'hej' } } retuns { A: { B: 'A.B' } }", () => {
    const inObj = { A: { B: 'hej' } }
    const expObj = { A: { B: 'A.B' } }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test("{ A: { B: 'hej', C: 7 } } retuns { A: { B: 'A.B', C: 'A.C' } }", () => {
    const inObj = { A: { B: 'hej', C: 7 } }
    const expObj = { A: { B: 'A.B', C: 'A.C' } }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })

  test("{ A: { B: 'hej', C: 7 }, D: 7 } retuns { A: { B: 'A.B', C: 'A.C' }, D: 'D' }", () => {
    const inObj = { A: { B: 'hej', C: 7 }, D: 7 }
    const expObj = { A: { B: 'A.B', C: 'A.C' }, D: 'D' }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })
  test("{ A: { B: 'hej', C: {} }, D: 7 } retuns { A: { B: 'A.B', C: 'A.C' }, D: 'D' }", () => {
    const inObj = { A: { B: 'hej', C: {} }, D: 7 }
    const expObj = { A: { B: 'A.B', C: 'A.C' }, D: 'D' }
    const outObj = getNamesForObject(inObj)
    expect(JSON.stringify(outObj)).toEqual(JSON.stringify(expObj))
  })
})
