import { useStore } from '../../store/stateProvider'
import { ActionType } from '../../store/actions'
import { userManager } from '../../utils/userManager'

const useAuth = () => {
  const [{ userInfo, userInfoState }, dispatch] = useStore()

  async function signInUser() {
    dispatch({
      type: ActionType.SetUserPending,
    })

    try {

      const mssg = await userManager.querySessionStatus()

      const user = await userManager.signinSilent()
      dispatch({
        type: ActionType.SetUserFulfilled,
        payload: user,
      })
    } catch (exception) {
      console.log('try', exception.msg)

      userManager.signinRedirect()
    }
  }

  async function signOutUser() {
    dispatch({
      type: ActionType.SetUserPending,
    })

    try {
      console.log('logoiut')
      dispatch({
        type: ActionType.SetUserLoggedOut
      })
      await userManager.signoutRedirect()
    } catch (exception) {
      console.log(exception)
    }
  }

  return {
    userInfo,
    signOutUser,
    userInfoState,
    signInUser,
  }
}

export default useAuth
