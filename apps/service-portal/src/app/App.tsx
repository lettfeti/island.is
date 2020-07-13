import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Login } from '../screens/login/login'
import { StateProvider } from '../stateProvider'
import * as store from '../store'
import Authenticator from '../components/authenticator/authenticator'
import Header from '../components/header/header'
import { Page, Box, ContentBlock } from '@island.is/island-ui/core'
import { ServicePortalModuleConstructor } from '@island.is/service-portal/classes'

// Note: Todo implement support
// const mockScope = ['finance.unpaidBills', 'finance.latestTransactions'];
const mockScope = ['finance']

const importModule = (
  moduleName: string,
): Promise<ServicePortalModuleConstructor> => {
  return import(
    `../../../../libs/service-portal/core/src/lib/${moduleName}/index`
  )
    .then((res) => res.default)
    .catch((e) => null)
}

export const App = () => {
  const [subjectScope, setSubjectScope] = useState(mockScope)
  const [viewModules, setViewModules] = useState([])
  const [availableRoutes, setAvailableRoutes] = useState<Array<any>>([])

  useEffect(() => {
    async function loadViews() {
      const componentPromises = subjectScope.map(async (scope) => {
        //Todo: Create scope parser
        const [moduleName, subModule] = scope.split('.')

        const module = await importModule(moduleName)
        if (!module) {
          return null
        }
        const ScopedModule = new module([
          'finance.documents.full_access',
          'finance.documents.read_only',
        ])
        console.log(ScopedModule)
        setAvailableRoutes((oldRoutes) => [
          ...oldRoutes,
          ...ScopedModule.navItems,
        ])
        return <ScopedModule.routes key={`module_${moduleName}`} />
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
                  <Link to={i.path} style={{ display: 'block' }} key={i.path}>
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
