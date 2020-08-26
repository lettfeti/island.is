import {
  UserManager,
  WebStorageStateStore,
  InMemoryWebStorage,
} from 'oidc-client'
import { ServicePortalPath } from '@island.is/service-portal/core'

const settings = {
  authority: 'https://siidentityserverweb20200805020732.azurewebsites.net/',
  // eslint-disable-next-line @typescript-eslint/camelcase
  client_id: 'island-is-1',
  // eslint-disable-next-line @typescript-eslint/camelcase
  silent_redirect_uri: `http://localhost:4200${ServicePortalPath.MinarSidurSilentSignInOidc}`,
  // eslint-disable-next-line @typescript-eslint/camelcase
  redirect_uri: `http://localhost:4200${ServicePortalPath.MinarSidurSignInOidc}`,
  // eslint-disable-next-line @typescript-eslint/camelcase
  post_logout_redirect_uri: `http://localhost:4200${ServicePortalPath.MinarSidurSignOutOidc}`,
  // eslint-disable-next-line @typescript-eslint/camelcase
  response_type: 'code',
  revokeAccessTokenOnSignout: true,
  loadUserInfo: true,
  grantType: 'authorization_code',
  automaticSilentRenew: true,
  scope: 'openid profile offline_access',
  userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
}

export const userManager = new UserManager(settings)
