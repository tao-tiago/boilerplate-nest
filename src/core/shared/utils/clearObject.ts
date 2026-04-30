export const clearObject = <T extends Record<string, unknown>>(
  object: T,
  exception: (keyof T)[] = []
): void => {
  Object.keys(object).forEach((key) => {
    if (!exception.includes(key as keyof T)) {
      delete object[key]
    }
  })
}
