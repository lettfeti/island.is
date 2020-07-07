import React, { useEffect, useState, lazy, Suspense } from 'react'
import { ServicePortalModuleProps } from '@island.is/service-portal/types'

// Note: We get scope from JWT
const mockScope = ['moduleA', 'moduleB']

const importModule = (
  moduleName,
): React.LazyExoticComponent<ServicePortalModuleProps> => {
  return lazy<ServicePortalModuleProps>(() =>
    // eslint-disable-line rule
    import(`libs/service-portal/modules/src/${moduleName}/index`).catch((e) =>
      import('@island.is/service-portal/modules/error/index'),
    ),
  )
}

export const App = () => {
  const [subjectScope, setSubjectScope] = useState(mockScope)
  const [viewModules, setViewModules] = useState([])
  const [availableRoutes, setAvailableRoutes] = useState([])

  useEffect(() => {
    async function loadViews() {
      const componentPromises = subjectScope.map(async (scope) => {
        const moduleName = scope
        console.log(moduleName)
        const View = await importModule(moduleName)
        // eslint-disable-next-line rule
        console.log(View)
        return (
          <View
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
  console.log(availableRoutes)
  return (
    <React.Suspense fallback="Loading views...">
      <div className="container">{viewModules}</div>
    </React.Suspense>
  )
}

export default App
