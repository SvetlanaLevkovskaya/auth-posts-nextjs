export const hasLongWord = (text: string, maxLength: number = 30): boolean => {
  return text.split(' ').some((word) => word.length > maxLength)
}
