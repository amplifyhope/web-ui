import fetchJson from 'utils/fetchJson';
import { Donation, Prisma } from '@prisma/client';

export type DonationCreateView = {
  id?: string;
  recurring: boolean;
  amount: number;
  date?: Date | string;
  recurring_type?: string | null;
};

export const listDonationsByUserId = async (
  userId: string
): Promise<Donation[]> => {
  const donations = await fetchJson(`/api/donations/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return donations;
};

export const createDonation = async (
  donation: Prisma.DonationCreateView,
  userId: string
): Promise<string> => {
  const donationId = await fetchJson(
    '/api/donations',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...donation, userId })
    },
    'Donation'
  );
  return donationId;
};
