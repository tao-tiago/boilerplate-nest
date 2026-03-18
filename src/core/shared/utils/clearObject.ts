export const clearObject = (object: Record<string, unknown>, exception: string[] = []): void => {
  Object.keys(object).forEach((key) => {
    if (!exception.includes(key)) {
      delete object[key]
    }
  })
}
