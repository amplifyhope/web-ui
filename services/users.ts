import fetchJson from 'utils/fetchJson'
import { User, Prisma } from '@prisma/client'

export const getUserById = async (id: string): Promise<User> => {
  const user: User = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const user: User = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${email}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  return user
}

export const createUser = async (
  user: Prisma.UserCreateInput
): Promise<string> => {
  const userId: string = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user })
    },
    'User'
  )
  return userId
}

export const updateUser = async (user: User): Promise<User> => {
  const updatedUser: User = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user })
    },
    'User'
  )
  return updatedUser
}

export const deleteUser = async (id: string): Promise<void> => {
  const deleted = await fetchJson(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
    {
      method: 'DELETE'
    }
  )
  return deleted
}
