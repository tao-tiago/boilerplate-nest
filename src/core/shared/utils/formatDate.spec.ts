import { formatDate } from "./formatDate"

describe("utils > formatDate", () => {
  const testDate = new Date("2025-05-20T14:50:10")

  describe("Date formatting with different patterns", () => {
    it("should format date in MM/DD/YYYY format", () => {
      const result = formatDate({ date: testDate, format: "MM/DD/YYYY" })
      expect(result).toBe("05/20/2025")
    })

    it("should format date in DD/MM/YYYY format", () => {
      const result = formatDate({ date: testDate, format: "DD/MM/YYYY" })
      expect(result).toBe("20/05/2025")
    })

    it("should format date in DD-MM-YYYY format", () => {
      const result = formatDate({ date: testDate, format: "DD-MM-YYYY" })
      expect(result).toBe("20-05-2025")
    })

    it("should format date in YYYY-MM-DD format", () => {
      const result = formatDate({ date: testDate, format: "YYYY-MM-DD" })
      expect(result).toBe("2025-05-20")
    })
  })

  describe("Time formatting", () => {
    it("should format time in 24-hour format HH:mm:ss", () => {
      const result = formatDate({ date: testDate, format: "HH:mm:ss" })
      expect(result).toBe("14:50:10")
    })

    it("should format time in 12-hour format hh:mm", () => {
      const result = formatDate({ date: testDate, format: "hh:mm" })
      expect(result).toBe("02:50")
    })

    it("should format time with seconds in 12-hour format hh:mm:ss", () => {
      const result = formatDate({ date: testDate, format: "hh:mm:ss" })
      expect(result).toBe("02:50:10")
    })

    it("should handle midnight in 12-hour format", () => {
      const midnightDate = new Date("2025-05-20T00:30:45")
      const result = formatDate({ date: midnightDate, format: "hh:mm:ss" })
      expect(result).toBe("12:30:45")
    })

    it("should handle noon in 12-hour format", () => {
      const noonDate = new Date("2025-05-20T12:30:45")
      const result = formatDate({ date: noonDate, format: "hh:mm:ss" })
      expect(result).toBe("12:30:45")
    })
  })

  describe("Combined date and time formatting", () => {
    it("should use default format when no format is provided", () => {
      const result = formatDate({ date: testDate })
      expect(result).toBe("2025-05-20 14:50:10")
    })

    it("should format full datetime with custom pattern", () => {
      const result = formatDate({ date: testDate, format: "DD/MM/YYYY HH:mm" })
      expect(result).toBe("20/05/2025 14:50")
    })

    it("should format with mixed separators", () => {
      const result = formatDate({ date: testDate, format: "YYYY-MM-DD HH:mm:ss" })
      expect(result).toBe("2025-05-20 14:50:10")
    })
  })

  describe("Default behavior", () => {
    it("should use current date when no date is provided", () => {
      const beforeCall = new Date()
      const result = formatDate({ format: "YYYY-MM-DD" })

      // The result should be a valid date string for today
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)

      // Verify the components match the current date by comparing the formatted strings
      const expectedResult = formatDate({ date: beforeCall, format: "YYYY-MM-DD" })
      expect(result).toBe(expectedResult)
    })

    it("should use default format and current date when no parameters provided", () => {
      const beforeCall = new Date()
      const result = formatDate({})

      // Should match the default format pattern
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)

      // Should be approximately the current time (within a few seconds)
      const resultDate = new Date(result.replace(" ", "T"))
      const timeDiff = Math.abs(resultDate.getTime() - beforeCall.getTime())
      expect(timeDiff).toBeLessThan(5000) // Less than 5 seconds difference
    })
  })

  describe("Edge cases and special dates", () => {
    it("should handle single digit months and days with padding", () => {
      const earlyDate = new Date("2025-01-05T09:08:07")
      const result = formatDate({ date: earlyDate, format: "DD/MM/YYYY HH:mm:ss" })
      expect(result).toBe("05/01/2025 09:08:07")
    })

    it("should handle December 31st correctly", () => {
      const yearEndDate = new Date("2024-12-31T23:59:59")
      const result = formatDate({ date: yearEndDate, format: "DD-MM-YYYY HH:mm:ss" })
      expect(result).toBe("31-12-2024 23:59:59")
    })

    it("should handle leap year February 29th", () => {
      const leapDate = new Date("2024-02-29T12:00:00")
      const result = formatDate({ date: leapDate, format: "DD/MM/YYYY" })
      expect(result).toBe("29/02/2024")
    })

    it("should handle early morning hours in 12-hour format", () => {
      const earlyMorning = new Date("2025-05-20T01:30:00")
      const result = formatDate({ date: earlyMorning, format: "hh:mm" })
      expect(result).toBe("01:30")
    })

    it("should handle late evening hours in 12-hour format", () => {
      const lateEvening = new Date("2025-05-20T23:45:00")
      const result = formatDate({ date: lateEvening, format: "hh:mm" })
      expect(result).toBe("11:45")
    })
  })

  describe("Custom format patterns", () => {
    it("should handle format with only year", () => {
      const result = formatDate({ date: testDate, format: "YYYY" })
      expect(result).toBe("2025")
    })

    it("should handle format with only time components", () => {
      const result = formatDate({ date: testDate, format: "HH:mm" })
      expect(result).toBe("14:50")
    })

    it("should handle format with text mixed in", () => {
      const result = formatDate({ date: testDate, format: "Today is DD/MM/YYYY at HH:mm" })
      expect(result).toBe("Today is 20/05/2025 at 14:50")
    })

    it("should handle format with repeated patterns", () => {
      const result = formatDate({ date: testDate, format: "YYYY-YYYY MM-MM DD-DD" })
      expect(result).toBe("2025-2025 05-05 20-20")
    })

    it("should handle empty format string", () => {
      const result = formatDate({ date: testDate, format: "" })
      expect(result).toBe("")
    })
  })
})
