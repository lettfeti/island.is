import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

const MainPage = lazy(() => import('./mainPage'))
const Subpage = lazy(() => import('./subPage'))

export const ModuleB = ({ getRoutes }) => {
  getRoutes && getRoutes(['/moduleB/subpage', '/moduleB'])
  return (
    <Switch>
      <Route
        path="/moduleB/subpage"
        component={() => (
          <Suspense fallback={<p>Loading</p>}>
            <Subpage></Subpage>
          </Suspense>
        )}
      />
      <Route
        path="/moduleB"
        component={() => (
          <Suspense fallback={<p>Loading</p>}>
            <MainPage></MainPage>
          </Suspense>
        )}
      />
    </Switch>
  )
}

export default ModuleB
