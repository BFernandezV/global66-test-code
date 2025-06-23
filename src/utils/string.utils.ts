/**
 *
 * @param str - The string to capitalize.
 * @description Capitalizes the first letter of a given string.
 * If the string is empty or undefined, it returns the original string.
 * @returns {string} - The string with the first letter capitalized.
 */

export const capitalizeFirstLetter = (str: string): string => {
  if (typeof str !== 'string') {
    return str
  }

  const trimmedStr = str.trim()
  if (trimmedStr.length === 0) {
    return ''
  }

  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1)
}
