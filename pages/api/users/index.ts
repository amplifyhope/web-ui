import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'common/database'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (foundUser) {
        res
          .status(302)
          .json(`User with email: ${foundUser.email} already exists`)
      }

      const userId = await prisma.user.create({
        data: { ...req.body },
        select: {
          id: true
        }
      })

      res.status(201).json(userId)
    } catch (error) {
      console.warn(error)
      res.status(500).json(error)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Method Not Allowed')
  }
}
