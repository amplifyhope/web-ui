export type DonationRequestBody = {
  email: string
  amount: number
  interval?: IntervalOptions
  fund: FundOptions
}

export enum IntervalOptions {
  month = 'month',
  quarter = 'quarter',
  year = 'year'
}

export enum FundOptions {
  general = 'general'
}

export type Donation = {
  id: string
  user_id: string
  recurring: boolean
  amount: number
  date: Date
  recurring_type: string | null
}

export type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string | null
  street_address: string | null
  city: string | null
  state: string | null
  country: string | null
  main_phone: string | null
}
