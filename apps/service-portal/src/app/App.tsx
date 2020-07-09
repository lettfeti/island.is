import React, { useEffect, useState, lazy, Suspense } from 'react'
import {
  ServicePortalModuleProps,
  ServicePortalNavItem,
  ServicePortalModule,
} from '@island.is/service-portal/types'
import { Link, Route, Switch } from 'react-router-dom'

import { Login } from '../screens/login/login'
import { StateProvider } from '../stateProvider'
import * as store from '../store'
import Authenticator from '../components/authenticator/authenticator'
import Header from '../components/header/header'
import { Page, Box, ContentBlock } from '@island.is/island-ui/core'

// Note: Todo implement support
// const mockScope = ['finance.unpaidBills', 'finance.latestTransactions'];
const mockScope = ['finance']

const importModule = (
  moduleName: string,
): Promise<ServicePortalModule | null> => {
  return import(`libs/service-portal/modules/src/${moduleName}/index`)
    .then((res) => res.default)
    .catch((e) => null)
}

export const App = () => {
  const [subjectScope, setSubjectScope] = useState(mockScope)
  const [viewModules, setViewModules] = useState([])
  const [availableRoutes, setAvailableRoutes] = useState<
    Array<ServicePortalNavItem>
  >([])

  useEffect(() => {
    async function loadViews() {
      const componentPromises = subjectScope.map(async (scope) => {
        const [moduleName, subModule] = scope.split('.')

        const module = await importModule(moduleName)
        if (!module) {
          return null
        }
        const ScopedModule = module([
          'finance.unpaidBills.full_access',
          'finance.latestTransactions',
          'finance.documents',
        ])
        setAvailableRoutes((oldRoutes) => [
          ...oldRoutes,
          ...ScopedModule.navItems,
        ])
        return <ScopedModule.component />
      })

      Promise.all(componentPromises).then(setViewModules)
    }

    loadViews()
  }, [subjectScope])
  return (
    <StateProvider initialState={store.initialState} reducer={store.reducer}>
      <Page>
        <Switch>
          <Route path="/innskraning">
            <Login />
          </Route>
          <Authenticator>
            <Header />
            <Box padding={[3, 3, 6, 0]}>
              <aside>
                <Link to="/">DASHBOARD!</Link>
                {availableRoutes.map((i) => (
                  <Link to={i.path} style={{ display: 'block' }}>
                    {i.label}
                  </Link>
                ))}
              </aside>

              <Suspense fallback="loading modules">
                <ContentBlock width="medium">{viewModules}</ContentBlock>
              </Suspense>
            </Box>
          </Authenticator>
        </Switch>
      </Page>
    </StateProvider>
  )
}

export default App
