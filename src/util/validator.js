export const valiPhone = (str) => {
  return /^1[0-9]{10}$/.test(str)
}