import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'common/database';
import { Prisma } from '@prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.status(302).json('found');
  } else if (req.method === 'POST') {
    const donation: Prisma.DonationCreateInput = req.body.donation;
    const donationId = await prisma.donation.create({
      data: { ...donation },
      select: {
        id: true
      }
    });
    res.status(201).json(donationId);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
