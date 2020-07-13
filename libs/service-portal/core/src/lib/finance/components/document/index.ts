import { lazy } from 'react'
import { ServicePortalComponent } from '@island.is/service-portal/types'
import { DocumentScope } from './document.scope'

export const Document: ServicePortalComponent = {
  component: lazy(() => import('./document.component')),
  availableScope: DocumentScope,
}
