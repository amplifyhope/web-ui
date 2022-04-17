import Stripe from 'stripe';

export type DonationRequestBody = {
  email: string;
  amount: number;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
};
