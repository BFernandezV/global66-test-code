/**
 *
 * @param str - The string to capitalize.
 * @description Capitalizes the first letter of a given string.
 * If the string is empty or undefined, it returns the original string.
 * @returns {string} - The string with the first letter capitalized.
 */

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
