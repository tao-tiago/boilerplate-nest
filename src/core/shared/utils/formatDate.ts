type formatDateProps = {
  date?: Date
  format?: string
}

export const formatDate = ({ date = new Date(), format = "YYYY-MM-DD HH:mm:ss" }: formatDateProps) => {
  const hours24 = date.getHours()
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12

  const map: { [key: string]: string } = {
    YYYY: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    DD: date.getDate().toString().padStart(2, "0"),
    HH: hours24.toString().padStart(2, "0"),
    hh: hours12.toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0")
  }

  return format.replace(/YYYY|MM|DD|HH|hh|mm|ss/g, (match) => map[match])
}
