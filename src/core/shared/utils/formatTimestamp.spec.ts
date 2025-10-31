import { formatTimestamp } from "./formatTimestamp"

describe("utils > formatTimestamp", () => {
  it("should transform timestamp to date", () => {
    // Default date in English format
    const date_01 = formatTimestamp({ timestamp: 1747770600554 })

    // Default date in Brasilian format
    const date_02 = formatTimestamp({
      timestamp: 1747770600554,
      locale: "pt-BR"
    })

    // Custom format hh:mm
    const date_03 = formatTimestamp({
      timestamp: 1747770600554,
      options: {
        hourCycle: "h24",
        hour: "2-digit",
        minute: "2-digit"
      }
    })

    // Custom only hour AM/PM format
    const date_04 = formatTimestamp({
      timestamp: 1747770600554,
      options: {
        hourCycle: "h12",
        hour: "2-digit"
      }
    })

    expect(date_01).toEqual("05/20/2025")
    expect(date_02).toEqual("20/05/2025")
    expect(date_03).toEqual("19:50")
    expect(date_04).toEqual("07 PM")
  })
})
