export const formatAmountForDisplay = (
  amount: number,
  currency: string
): string => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  })
  return numberFormat.format(amount)
}

export const formatAmountForDisplayFromStripe = (
  amount: number,
  currency: string
): string => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  })
  return numberFormat.format(amount / 100)
}
