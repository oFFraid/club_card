export abstract class DateFormatter {
  static ddMMyy = (date?: Date) => {
    return date?.toLocaleDateString('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }
  static yyyymmdd = (date?: Date) => {
    if (!date) return
    return date.toISOString().split('T')[0]
  }
}

export abstract class NumberFormatter {
  static format = (price?: number) => {
    if (typeof price !== 'number') return price
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
      currencyDisplay: 'symbol',
    }).format(price)
  }
}
