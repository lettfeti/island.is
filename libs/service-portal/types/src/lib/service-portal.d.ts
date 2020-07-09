import { FC } from 'react'

export interface ServicePortalNavigation {
  routes: ServicePortalNavItem[]
}
export interface ServicePortalNavItem {
  group?: 'action' | 'information'
  label: string
  path: string
  navItems?: Array<ServicePortalNavItem>
}

export interface ServicePortalModuleRoute {
  group?: 'action' | 'information'
  label: string
  path: string
  scope: string[]
  Component: React.FC<any>
  navItems?: Array<ServicePortalModuleRoute>
}

export type ServicePortalModuleProps = FC<ServicePortalModule>

export interface ServicePortalModule {
  (scope: Array<string>): {
    component: React.FC<any>
    dashboard: React.Component[]
    navItems: ServicePortalNavItem[]
  }
}
