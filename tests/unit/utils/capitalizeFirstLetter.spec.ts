import { describe, it, expect } from 'vitest'
import { capitalizeFirstLetter } from '../../../src/utils/string.utils'

describe('capitalizeFirstLetter', () => {
  // --- Existing Tests (Good job on these!) ---
  it('should capitalize the first letter of a single word', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello')
  })

  it('should capitalize the first letter of a sentence', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world')
  })

  it('should handle an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })

  it('should not change the case of the rest of the string', () => {
    expect(capitalizeFirstLetter('hELLO')).toBe('HELLO')
  })

  it('should handle strings with leading spaces', () => {
    expect(capitalizeFirstLetter('   hello')).toBe('Hello')
  })

  it('should handle strings with trailing spaces', () => {
    expect(capitalizeFirstLetter('hello   ')).toBe('Hello')
  })

  it('should handle strings with only spaces', () => {
    expect(capitalizeFirstLetter('   ')).toBe('')
  })

  it('should handle strings with leading and trailing spaces', () => {
    expect(capitalizeFirstLetter('   hello world   ')).toBe('Hello world')
  })

  it('should handle a string that is already capitalized', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello')
    expect(capitalizeFirstLetter('HELLO')).toBe('HELLO')
  })

  it('should handle strings with numbers at the beginning', () => {
    expect(capitalizeFirstLetter('123abc')).toBe('123abc')
  })

  it('should handle strings with special characters at the beginning', () => {
    expect(capitalizeFirstLetter('!hello')).toBe('!hello')
    expect(capitalizeFirstLetter('@world')).toBe('@world')
  })

  it('should handle strings with internal spaces (not affecting them)', () => {
    expect(capitalizeFirstLetter(' hello   world ')).toBe('Hello   world')
  })

  it('should handle strings with multiple words and mixed casing', () => {
    expect(capitalizeFirstLetter('tHIS iS a sEnTeNcE')).toBe('THIS iS a sEnTeNcE')
  })

  it('should return the original string if it is not a string', () => {
    expect(capitalizeFirstLetter(123 as unknown as string)).toBe(123)
    expect(capitalizeFirstLetter(null as unknown as string)).toBe(null)
    expect(capitalizeFirstLetter(undefined as unknown as string)).toBe(undefined)
  })
})
