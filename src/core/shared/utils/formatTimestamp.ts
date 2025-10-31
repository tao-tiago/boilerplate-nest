type FormatTimestampProps = {
  timestamp: number
  locale?: Intl.LocalesArgument
  options?: Intl.DateTimeFormatOptions
}

export const formatTimestamp = ({
  timestamp,
  locale = "en-US",
  options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }
}: FormatTimestampProps) => new Date(timestamp).toLocaleString(locale, options)
