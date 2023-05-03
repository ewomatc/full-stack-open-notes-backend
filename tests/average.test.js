const {average} = require('../utils/for_testing.js')

describe('average test', () => {
  test('average of one value is the value itself', () => {
    const result = average([1])

    expect(result).toBe(1)
  })

  test('average of many is calculated correctly', () => {
    const result = average([1, 2, 3, 4, 5, 6])

    expect(result).toBe(3.5)
  })

  test('average of empty array is zero', () => {
    const result = average([])

    expect(result).toBe(0)
  })
})