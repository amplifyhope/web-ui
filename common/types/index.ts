export type DonationRequestBody = {
  email: string
  amount: number
  interval: IntervalOptions | null
  stripeProductId: string
  notes?: string
  isRecurring: boolean
}

export type LoginWithEmailRequestBody = {
  email: string
}

export enum IntervalOptions {
  month = 'month',
  quarter = 'quarter',
  year = 'year'
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
