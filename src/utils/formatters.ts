export abstract class DateFormatter {
  static yyyymmdd = (date?: Date) => {
    if (!date) return undefined
    return date.toJSON().slice(0, 10)
  }
}
