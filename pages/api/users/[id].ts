import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'common/database'
import { User } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const email: string = req.query.id as string
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      if (!foundUser) {
        res.status(404).json('User does not exist')
      }
      res.status(302).json(foundUser)
    } catch (err) {
      console.warn(err)
      res.status(500).json(err)
    }
  } else if (req.method === 'PUT') {
    try {
      const user: User = req.body.user
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: { ...user }
      })

      res.status(200).json(updatedUser)
    } catch (err) {
      console.warn(err)
      res.status(500).json(err)
    }
  } else if (req.method === 'DELETE') {
    res.status(200).json('Deleted, but not really')
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end('Method Not Allowed')
  }
}
