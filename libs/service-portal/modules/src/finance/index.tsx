import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'

import {
  ServicePortalModule,
  ServicePortalModuleRoute,
} from '@island.is/service-portal/types'

const FinanceScreen = lazy(() => import('./screens/financeScreen'))

// Note: scope = ['finance'];
export const FinanceModule: ServicePortalModule = (
  subjectScope: Array<string>,
) => {
  const routes: Array<ServicePortalModuleRoute> = [
    {
      group: 'information',
      label: 'Fjármál',
      path: '/fjarmal',
      scope: [
        'finance.unpaidBills',
        'finance.latestTransactions',
        'finance.documents',
      ],
      Component: FinanceScreen,
    },
  ]

  const scopedRoutes = routes.filter((i) =>
    subjectScope.some((x) => i.scope.includes(x)),
  )
  const navItems = scopedRoutes.map(({ Component, scope, ...rest }) => rest)
  return {
    // Note: Filtered routes based on scope.
    component: () => (
      <>
        {scopedRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            component={() => (
              <Suspense fallback={<p>Loading</p>}>
                <Component scope={subjectScope}></Component>
              </Suspense>
            )}
          />
        ))}
      </>
    ),

    // Note: Filtered dashboard modules based on scope.
    dashboard: [],

    // Note: Filtered navItems based on scope.
    navItems,
  }
}

export default FinanceModule
