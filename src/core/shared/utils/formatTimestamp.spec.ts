import { formatTimestamp } from "./formatTimestamp"

describe("utils > formatTimestamp", () => {
  // Fixed timestamp: May 20, 2025 19:50:00.554 UTC
  const testTimestamp = 1747770600554

  describe("Default behavior", () => {
    it("should format timestamp with default options (en-US locale)", () => {
      const result = formatTimestamp({ timestamp: testTimestamp })
      expect(result).toBe("05/20/2025")
    })

    it("should handle zero timestamp (Unix epoch) with UTC", () => {
      const result = formatTimestamp({
        timestamp: 0,
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
      })
      expect(result).toBe("01/01/1970")
    })

    it("should handle negative timestamp (before Unix epoch) with UTC", () => {
      const result = formatTimestamp({
        timestamp: -86400000, // One day before epoch
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
      })
      expect(result).toBe("12/31/1969")
    })
  })

  describe("Locale formatting", () => {
    it("should format timestamp in Brazilian locale (pt-BR)", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        locale: "pt-BR"
      })
      expect(result).toBe("20/05/2025")
    })

    it("should format timestamp in German locale (de-DE)", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        locale: "de-DE"
      })
      expect(result).toBe("20.05.2025")
    })

    it("should format timestamp in Japanese locale (ja-JP)", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        locale: "ja-JP"
      })
      expect(result).toBe("2025/05/20")
    })

    it("should handle multiple locales array", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        locale: ["fr-FR", "en-US"]
      })
      expect(result).toBe("20/05/2025")
    })
  })

  describe("Time formatting", () => {
    it("should format time in 24-hour format with UTC", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h24",
          hour: "2-digit",
          minute: "2-digit"
        }
      })
      expect(result).toBe("19:50")
    })

    it("should format time in 12-hour format with AM/PM", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h12",
          hour: "2-digit",
          minute: "2-digit"
        }
      })
      expect(result).toBe("07:50 PM")
    })

    it("should format only hour in 12-hour format", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h12",
          hour: "2-digit"
        }
      })
      expect(result).toBe("07 PM")
    })

    it("should format time with seconds", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h24",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      })
      expect(result).toBe("19:50:00")
    })

    it("should format time with milliseconds", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h24",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 3
        }
      })
      expect(result).toBe("19:50:00.554")
    })

    it("should format time in local timezone", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          hourCycle: "h24",
          hour: "2-digit",
          minute: "2-digit"
        }
      })
      // This will vary based on system timezone, so we just check format
      expect(result).toMatch(/^\d{2}:\d{2}$/)
    })
  })

  describe("Date formatting options", () => {
    it("should format with long month names", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      })
      expect(result).toBe("May 20, 2025")
    })

    it("should format with short month names", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric",
          month: "short",
          day: "numeric"
        }
      })
      expect(result).toBe("May 20, 2025")
    })

    it("should format with numeric month", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric",
          month: "numeric",
          day: "numeric"
        }
      })
      expect(result).toBe("5/20/2025")
    })

    it("should format with weekday", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      })
      expect(result).toBe("Tuesday, May 20, 2025")
    })

    it("should format with short weekday", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          weekday: "short",
          month: "short",
          day: "numeric"
        }
      })
      expect(result).toBe("Tue, May 20")
    })

    it("should format only year", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric"
        }
      })
      expect(result).toBe("2025")
    })

    it("should format only month and year", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric",
          month: "long"
        }
      })
      expect(result).toBe("May 2025")
    })
  })

  describe("Combined date and time formatting", () => {
    it("should format full datetime with default locale in UTC", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h24"
        }
      })
      expect(result).toBe("05/20/2025, 19:50:00")
    })

    it("should format full datetime with Brazilian locale in UTC", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        locale: "pt-BR",
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24"
        }
      })
      expect(result).toBe("20/05/2025, 19:50")
    })

    it("should format readable datetime in UTC", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hourCycle: "h12"
        }
      })
      expect(result).toBe("Tuesday, May 20, 2025 at 7:50 PM")
    })

    it("should format datetime in local timezone", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24"
        }
      })
      // This will vary based on system timezone, so we just check format
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/)
    })
  })

  describe("Edge cases", () => {
    it("should handle very large timestamps", () => {
      const largeTimestamp = 9999999999999 // Year 2286
      const result = formatTimestamp({ timestamp: largeTimestamp })
      expect(result).toBe("11/20/2286")
    })

    it("should handle small positive timestamps with UTC", () => {
      const smallTimestamp = 1000 // 1 second after epoch
      const result = formatTimestamp({
        timestamp: smallTimestamp,
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        }
      })
      expect(result).toBe("01/01/1970")
    })

    it("should handle midnight timestamp in UTC", () => {
      const midnightTimestamp = new Date("2025-05-20T00:00:00.000Z").getTime()
      const result = formatTimestamp({
        timestamp: midnightTimestamp,
        options: {
          timeZone: "UTC",
          hourCycle: "h23",
          hour: "2-digit",
          minute: "2-digit"
        }
      })
      expect(result).toBe("00:00")
    })

    it("should handle leap year date", () => {
      const leapYearTimestamp = new Date("2024-02-29T12:00:00.000Z").getTime()
      const result = formatTimestamp({ timestamp: leapYearTimestamp })
      expect(result).toBe("02/29/2024")
    })
  })

  describe("Time zone considerations", () => {
    it("should format with specific timezone", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "UTC",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24"
        }
      })
      expect(result).toBe("05/20/2025, 19:50")
    })

    it("should format with Tokyo timezone", () => {
      const result = formatTimestamp({
        timestamp: testTimestamp,
        options: {
          timeZone: "Asia/Tokyo",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h24"
        }
      })
      expect(result).toBe("04:50") // UTC+9, so 19:50 UTC becomes 04:50+1 day JST
    })
  })
})
