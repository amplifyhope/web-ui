import { STRIPE_FEE_PERCENT_MODIFIER, STRIPE_FEE_FIXED } from '../config'

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

export const calculateStripeFees = (amount: number): number => {
  return Number(
    (amount * STRIPE_FEE_PERCENT_MODIFIER + STRIPE_FEE_FIXED).toFixed(2)
  )
}
