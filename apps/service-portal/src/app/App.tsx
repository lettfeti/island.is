import React, { useEffect, useState, lazy, Suspense } from 'react'
import {
  ServicePortalModuleProps,
  ServicePortalNavItem,
} from '@island.is/service-portal/types'
import { Link, Route, Switch } from 'react-router-dom'

import { Login } from '../screens/login/login'
import { StateProvider } from '../stateProvider'
import * as store from '../store'
import Authenticator from '../components/authenticator/authenticator'
import Header from '../components/header/header'
import { Page, Box, ContentBlock } from '@island.is/island-ui/core'

const mockScope = ['moduleA.subA']

const importModule = (
  moduleName: string,
): React.LazyExoticComponent<ServicePortalModuleProps> => {
  return lazy<ServicePortalModuleProps>(() =>
    import(`libs/service-portal/modules/src/${moduleName}/index`).catch((e) =>
      import('@island.is/service-portal/modules/error/index'),
    ),
  )
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

        const View = await importModule(moduleName)
        return (
          <View
            scope={[subModule]}
            getRoutes={(routes) =>
              setAvailableRoutes((oldState) => [...oldState, ...routes])
            }
          />
        )
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
            <Suspense fallback="Loading views...">
              <Box padding={[3, 3, 6, 0]}>
                <aside>
                  <Link to="/">DASHBOARD!</Link>
                  {availableRoutes.map((i) => (
                    <Link to={i.path} style={{ display: 'block' }}>
                      {i.label}
                    </Link>
                  ))}
                </aside>
                <ContentBlock width="medium">{viewModules}</ContentBlock>
              </Box>
            </Suspense>
          </Authenticator>
        </Switch>
      </Page>
    </StateProvider>
  )
}

export default App
