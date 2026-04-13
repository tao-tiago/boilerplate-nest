import { stringToDate } from "./stringToDate"

describe("utils > stringToDate", () => {
  it("should transform date string into date object", () => {
    expect(stringToDate("1986-10-15").getFullYear()).toEqual(1986)
    expect(stringToDate("2015-01-15").getMonth()).toEqual(0)
    expect(stringToDate("2020-05-01").getDate()).toEqual(1)
  })

  it("should throw an error for invalid date format", () => {
    expect(() => stringToDate("15-10-1986")).toThrow("Invalid date format. Expected format: YYYY-MM-DD")
    expect(() => stringToDate("2000/01/01")).toThrow("Invalid date format. Expected format: YYYY-MM-DD")
    expect(() => stringToDate("string-format")).toThrow("Invalid date format. Expected format: YYYY-MM-DD")
  })
})
