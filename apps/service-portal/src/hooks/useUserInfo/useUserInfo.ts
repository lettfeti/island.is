import { useStore } from '../../store/stateProvider'
import { setUserToken, renewToken } from '../../auth/utils'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'

const useUserInfo = () => {
  const [{ userInfo, userInfoState }, dispatch] = useStore();
  const refreshUser = async() => {
    try {
      console.log('IM HERERE');
      dispatch({type: 'setUserPending'});
      const {token} = await renewToken();
      console.log('GOT TOKEN');
      dispatch({
        type: 'setUserFulfilled',
        payload: jwtDecode(token),
        token: token,
      })
      console.log('DISPATCHED USER')
    } catch (error) {
      logoutUser();
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
      console.log('user info')
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
  }

  return {
    userInfo,
    userInfoState,
    setUser,
    logoutUser,
    isAuthenticated: !!userInfo,
    refreshUser
  }
}

export default useUserInfo
