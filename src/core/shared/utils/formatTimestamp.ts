type FormatTimestampProps = {
  timestamp: number
  locales?: Intl.LocalesArgument
  options?: Intl.DateTimeFormatOptions & {
    fractionalSecondDigits?: 1 | 2 | 3
  }
}

export const formatTimestamp = ({
  timestamp,
  locales = "en-US",
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }
}: FormatTimestampProps) => new Date(timestamp).toLocaleString(locales, options)
