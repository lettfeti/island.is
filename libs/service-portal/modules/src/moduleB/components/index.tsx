import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  ServicePortalModuleProps,
  ServicePortalNavItem,
} from '@island.is/service-portal/types'
const MainPage = lazy(() => import('./mainPage'))
const Subpage = lazy(() => import('./subPage'))

interface ModuleBRoutes {
  mainPage: ServicePortalNavItem
  subPage: ServicePortalNavItem
}

export const ModuleB: ServicePortalModuleProps = ({ getRoutes }) => {
  const navItems: ModuleBRoutes = {
    mainPage: {
      path: '/moduleB',
      label: 'Module B',
    },
    subPage: {
      path: '/moduleB/subpage',
      label: 'SubPage',
    },
  }
  getRoutes && getRoutes([navItems.mainPage, navItems.subPage])
  return (
    <Switch>
      us
      <Route
        path={navItems.subPage.path}
        component={() => (
          <Suspense fallback={<p>Loading</p>}>
            <Subpage></Subpage>
          </Suspense>
        )}
      />
      <Route
        path={navItems.mainPage.path}
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
