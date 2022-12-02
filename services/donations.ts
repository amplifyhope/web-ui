import { Donation } from 'common/types'
import fetchJson from 'utils/fetchJson'

export type DonationCreateView = {
  id?: string
  recurring: boolean
  amount: number
  date?: Date | string
  recurring_type?: string | null
}

export const listDonationsByUserId = async (
  userId: string
): Promise<Donation[]> => {
  const donations = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/donations/${userId}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return donations
}

export const createDonation = async (
  donation: DonationCreateView,
  userId: string
): Promise<string> => {
  const donationId = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/donations`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...donation, userId })
    },
    'Donation'
  )
  return donationId
}
