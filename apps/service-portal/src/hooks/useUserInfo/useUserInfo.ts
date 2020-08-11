import { useStore } from '../../store/stateProvider'
import { setUserToken, renewToken, exchangeToken } from '../../auth/utils'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'

const useUserInfo = () => {
  const [{ userInfo, userInfoState }, dispatch] = useStore();
  const refreshUser = async() => {
    try {
      dispatch({type: 'setUserPending'});
      const {token} = await renewToken();
      dispatch({
        type: 'setUserFulfilled',
        payload: jwtDecode(token),
        token: token,
      })
    } catch (error) {
      logoutUser();
    }
  }
  const tokenExchange = async (subjectNationalId:string) => {
      dispatch({type: 'setUserPending'})
      try {
        const {token} = await exchangeToken(subjectNationalId)
        dispatch({
          type: 'setUserFulfilled',
          payload: jwtDecode(token),
          token: token,
        })
      } catch (error) {
        alert(error)
      }
  }

  const setUser = async (
    actorNationalId?: string,
    subjectNationalId?: string,
  ) => {
    async function fetchUserInfo() {
      dispatch({
        type: 'setUserPending',
       })

      const updatedInfo = await setUserToken(
        actorNationalId || userInfo?.actor?.nationalId,
        subjectNationalId,
      )


      dispatch({
        type: 'setUserFulfilled',
        payload: jwtDecode(updatedInfo.token),
        token: updatedInfo.token,
      })
    }

    return fetchUserInfo()
  }

  const logoutUser = () => {
    Cookies.remove(MOCK_AUTH_KEY);
    dispatch({type: 'setuserLoggedOut'})
    localStorage.setItem('logout', (new Date()).toString())
  }

  return {
    userInfo,
    userInfoState,
    setUser,
    logoutUser,
    isAuthenticated: !!userInfo,
    refreshUser,
    tokenExchange
  }
}

export default useUserInfo
