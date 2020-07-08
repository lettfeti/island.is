import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  ServicePortalModuleProps,
  ServicePortalNavItem,
} from '@island.is/service-portal/types'
import SubPage from './subPage'
const MainPage = lazy(() => import('./mainPage'))
const Subpage = lazy(() => import('./subPage'))

const DashboardModule = lazy(() => import('./subPage'))

interface ModuleARoutes {
  subA: { Component: any } & ServicePortalNavItem
  subB: { Component: any } & ServicePortalNavItem
  subC: { Component: any } & ServicePortalNavItem
  subD: { Component: any } & ServicePortalNavItem
}

export const ModuleA: ServicePortalModuleProps = ({ getRoutes, scope }) => {
  const navItems: ModuleARoutes = {
    subA: {
      path: '/moduleA/subA',
      label: 'Module A - SubPage A',
      Component: SubPage,
    },
    subB: {
      path: '/moduleA/subB',
      label: 'Module A - SubPage B',
      Component: MainPage,
    },
    subC: {
      path: '/moduleA/subC',
      label: 'Module A - SubPage C',
      Component: SubPage,
    },
    subD: {
      path: '/moduleA/subD',
      label: 'Module A - SubPage D',
      Component: SubPage,
    },
  }

  const scopedRoute = scope.map((i) => navItems[i])

  getRoutes && scopedRoute && getRoutes(scopedRoute)
  return (
    <>
      {scopedRoute.map(({ path, label, Component }) => (
        <Route
          path={path}
          component={() => (
            <Suspense fallback={<p>Loading</p>}>
              <Component title={label}></Component>
            </Suspense>
          )}
        />
      ))}
    </>
  )
}

export default ModuleA
