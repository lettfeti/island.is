import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { userManager } from '../../utils/userManager'
import AuthenticatorLoadingScreen from './AuthenticatorLoadingScreen'
import { useStore } from '../../store/stateProvider'
import { ActionType } from '../../store/actions'

export const OidcSignOut: FC = () => {
  const history = useHistory()
  const [, dispatch] = useStore()

  useEffect(() => {
    console.log('esdfsef')
    userManager
      .signoutCallback(window.localStorage.href)
      .then(function() {
        dispatch({
          type: ActionType.SetUserLoggedOut,
        })
        // Send user back to identity server
        history.push('/')
      })
      .catch(function(error) {
        // TODO: Handle error
        console.log('esdfsef')
        console.log('error', error)
      })
  }, [])

  return <AuthenticatorLoadingScreen />
}

export default OidcSignOut
