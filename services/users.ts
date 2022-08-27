import fetchJson from 'utils/fetchJson'
import { User, Prisma } from '@prisma/client'

export const getUserById = async (id: string): Promise<User> => {
  const user: User = await fetchJson(`/api/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return user
}

export const getUserByEmail = async (email: string): Promise<User> => {
  const user: User = await fetchJson(`/api/users/${email}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return user
}

export const createUser = async (
  user: Prisma.UserCreateInput
): Promise<string> => {
  const userId: string = await fetchJson(
    '/api/users',
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
    `/api/users/${user.id}`,
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
  const deleted = await fetchJson(`/api/users/${id}`, {
    method: 'DELETE'
  })
  return deleted
}
