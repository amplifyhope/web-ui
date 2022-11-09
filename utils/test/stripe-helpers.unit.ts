import { expect } from 'chai'
import {
  formatAmountForDisplay,
  formatAmountForDisplayFromStripe
} from '../stripe-helpers'

describe('#stripeHelpers', () => {
  it('should format a number to equal value currency string', () => {
    expect(formatAmountForDisplay(112.357, 'usd')).to.eq('$112.36')
  })

  it('should format cents amount from stripe into dollars', () => {
    expect(formatAmountForDisplayFromStripe(112.78, 'usd')).to.eq('$1.13')
  })
})
