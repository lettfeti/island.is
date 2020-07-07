import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

const MainPage = lazy(() => import('./mainPage'))
const Subpage = lazy(() => import('./subPage'))

export const ModuleA = ({ getRoutes }) => {
  getRoutes && getRoutes(['akmlsdmklasd', 'najsdnjasd'])
  return (
    <Switch>
      <Route
        path="/moduleA/subpage"
        component={() => (
          <Suspense fallback={<p>Loading</p>}>
            <Subpage></Subpage>
          </Suspense>
        )}
      />
      <Route
        path="/moduleA"
        component={() => (
          <Suspense fallback={<p>Loading</p>}>
            <MainPage></MainPage>
          </Suspense>
        )}
      />
    </Switch>
  )
}

export default ModuleA
