export type DonationRequestBody = {
  email: string
  amount: number
  interval?: IntervalOptions
  interval_count?: number
}

export enum IntervalOptions {
  month = 'month',
  quarter = 'quarter',
  year = 'year'
}
