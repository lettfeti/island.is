import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
import Cookies from 'js-cookie'
import { JwtPayload } from '../mirage-server/models/jwt-model'

export const sleep = (ms = 0) => {
  return new Promise((r) => setTimeout(r, ms))
}

interface MockToken {
  token: ''
}

export const isAuthenticated = async() => Cookies.get(MOCK_AUTH_KEY)?.length > 0

export const setUserToken = async (
  actorNationalId = '2606862759',
  subjectNationalId = '2606862759',
): Promise<MockToken> => {
  const token = await fetch('/user/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      actorNationalId,
      subjectNationalId,
    }),
  })

  const retToken = await token.json()

  return retToken
}

export const renewToken = async (): Promise<MockToken> => {
  const refreshToken: string = Cookies.get(MOCK_AUTH_KEY)
  const token = await fetch('/user/refreshtoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token : refreshToken
    }),
  })

  const retToken = await token.json()

  return retToken
}

export const exchangeToken = async (subjectNationalId: string): Promise<MockToken> => {
  const refreshToken: string = Cookies.get(MOCK_AUTH_KEY)
  const token = await fetch(`/user/tokenexchange/${subjectNationalId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token : refreshToken
    }),
  })

  const retToken = await token.json()

  return retToken
}


export const removeToken = () => {
  Cookies.remove(MOCK_AUTH_KEY)
}
