export const stringToDate = (dateString: string) => {
  const checkDateFormat = /^\d{4}-\d{2}-\d{2}$/

  if (!checkDateFormat.test(dateString)) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DD")
  }

  const [year, month, day] = dateString.split("-")

  return new Date(Number(year), Number(month) - 1, Number(day))
}
