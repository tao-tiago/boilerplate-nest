import { formatDate } from "./formatDate"

describe("utils > formatDate", () => {
  it("should format date for custom string", () => {
    const date = new Date("2025-05-20T14:50:10")

    const date_01 = formatDate({ date, format: "MM/DD/YYYY" })
    const date_02 = formatDate({ date, format: "DD/MM/YYYY" })
    const date_03 = formatDate({ date, format: "DD-MM-YYYY" })
    const date_04 = formatDate({ date })
    const date_05 = formatDate({ format: "HH:mm:ss" })
    const date_06 = formatDate({
      date: new Date("2025-05-20T12:50:10"),
      format: "hh:mm"
    })

    expect(date_01).toEqual("05/20/2025")
    expect(date_02).toEqual("20/05/2025")
    expect(date_03).toEqual("20-05-2025")
    expect(date_04).toEqual("2025-05-20 14:50:10")
    expect(date_05).toEqual(new Date().toTimeString().split(" ")[0])
    expect(date_06).toEqual("12:50")
  })
})
