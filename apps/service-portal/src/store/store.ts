import Cookies from 'js-cookie'

import {
  ServicePortalModule,
  ServicePortalNavigationRoot,
} from '@island.is/service-portal/core'
import { SubjectListDto } from '../mirage-server/models/subject'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
import jwtDecode from 'jwt-decode'
import { JwtPayload } from '../mirage-server/models/jwt-model'
import { modules } from './modules'

type NotificationSidebarState = 'open' | 'closed'

export type Action =
  | { type: 'setUserPending' }
  | { type: 'setuserLoggedOut' }
  | { type: 'setUserFulfilled'; payload: JwtPayload; token: string }
  | { type: 'fetchNavigationPending' }
  | { type: 'fetchNavigationFulfilled'; payload: ServicePortalNavigationRoot[] }
  | { type: 'fetchNavigationFailed' }
  | { type: 'fetchSubjectListPending' }
  | { type: 'fetchSubjectListFulfilled'; payload: SubjectListDto[] }
  | { type: 'fetchSubjectListFailed' }
  | { type: 'setNotificationSidebarState'; payload: NotificationSidebarState }

export type AsyncActionState = 'passive' | 'pending' | 'fulfilled' | 'failed'

export interface StoreState {
  userInfo: JwtPayload | null
  accessToken: string | null
  userInfoState: AsyncActionState
  modules: ServicePortalModule[]
  navigation: ServicePortalNavigationRoot[]
  navigationState: AsyncActionState
  subjectList: SubjectListDto[]
  subjectListState: AsyncActionState
  notificationSidebarState: NotificationSidebarState
}

export const initialState: StoreState = {
  userInfo: null,
  userInfoState: 'passive',
  accessToken: '',
  modules: modules,
  navigation: [],
  navigationState: 'passive',
  subjectList: [],
  subjectListState: 'passive',
  notificationSidebarState: 'open',
}

export const reducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'setUserPending':
      return {
        ...state,
        userInfoState: 'pending',
      }
    case 'setUserFulfilled':
      return {
        ...state,
        userInfo: action.payload,
        accessToken: action.token,
        userInfoState: 'fulfilled',
      }
    case 'setuserLoggedOut':
      return {
      ...initialState
      }

    case 'fetchNavigationPending':
      return {
        ...state,
        navigationState: 'pending',
      }
    case 'fetchNavigationFulfilled':
      return {
        ...state,
        navigation: action.payload,
        navigationState: 'fulfilled',
      }
    case 'fetchNavigationFailed':
      return {
        ...state,
        navigationState: 'failed',
      }
    case 'fetchSubjectListPending':
      return {
        ...state,
        subjectListState: 'pending',
      }
    case 'fetchSubjectListFulfilled':
      return {
        ...state,
        subjectListState: 'fulfilled',
        subjectList: action.payload,
      }
    case 'fetchSubjectListFailed':
      return {
        ...state,
        subjectListState: 'failed',
      }
    case 'setNotificationSidebarState':
      return {
        ...state,
        notificationSidebarState: action.payload,
      }
    default:
      return state
  }
}
