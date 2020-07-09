import { FC } from 'react'

export interface ServicePortalNavigation {
  routes: ServicePortalNavItem[]
}
export interface ServicePortalNavItem {
  label: string
  path: string
}

interface ServicePortalModule {
  getRoutes?: (navItems: ServicePortalNavItem[]) => void
  scope: string[]
}

export type ServicePortalModuleProps = FC<ServicePortalModule>