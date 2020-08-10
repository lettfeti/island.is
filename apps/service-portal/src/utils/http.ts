import { useStore } from '../store/stateProvider'
import { connect } from 'net'


 export const fetchWithAuth = (url: string, bearerToken: string) => {
  return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearerToken}`,
      },
    })
 }

