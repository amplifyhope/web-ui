import Router from 'next/router'
import { alertService } from './alerts'

class ResponseError extends Error {
  public response: any
  public data: any
}

export default async function fetchJson(
  path: string,
  args: any,
  modelName: string = '',
  redirectOnCreate = true
) {
  const alertOptions = {
    id: 'global-alerts',
    autoClose: true,
    keepAfterRouteChange: false
  }

  try {
    const response = await fetch(path, args)
    if (response.status === 204) {
      if (modelName && args.body) {
        alertService.success(`${modelName} Saved`, alertOptions)
      } else if (modelName && args.method === 'DELETE') {
        alertService.success(`${modelName} Removed`, alertOptions)
      }
      return true
    }

    if (response.status === 201) {
      if (modelName) {
        alertService.success(`${modelName} created`, alertOptions)
      }
      const url = response.headers.get('Location')
      if (url && redirectOnCreate) {
        return Router.push(url)
      }
      if (url && !redirectOnCreate) {
        return url.split('/').pop()
      }
    }

    if (response.status === 500) {
      return false
    }

    const data = await response.json()
    if (response.ok) {
      return data
    }

    if (data && data.errors) {
      const dataError = new ResponseError(data.errors[0])
      dataError.response = response
      dataError.data = data
      throw dataError
    }

    const error = new ResponseError(response.statusText)
    error.response = response
    error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    alertService.error(error.message, alertOptions)
    return false
  }
}
