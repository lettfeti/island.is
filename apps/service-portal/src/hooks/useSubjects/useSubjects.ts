import { useStore } from '../../store/stateProvider'
import { useEffect } from 'react'
import { fetchWithAuth } from '../../utils/http'

const useSubjects = () => {
  const [{ subjectList, subjectListState, accessToken }, dispatch] = useStore()

  useEffect(() => {
    async function fetchSubjectList() {
      dispatch({ type: 'fetchSubjectListPending' })

      try {
        const res = await fetchWithAuth('/user/accounts', accessToken)
        const data = await res.json()
        dispatch({
          type: 'fetchSubjectListFulfilled',
          payload: data.subjects,
        })
      } catch (err) {
        console.error(err)
        dispatch({ type: 'fetchSubjectListFailed' })
      }
    }

    fetchSubjectList()
  }, [dispatch])

  return {
    subjectList,
    subjectListState,
  }
}

export default useSubjects
