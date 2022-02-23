import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'common/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { email } = req.body;
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email as string
      }
    });

    if (foundUser) {
      res.status(302).json(foundUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Method Not Allowed');
  }
}
