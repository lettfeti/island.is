import { LazyExoticComponent, FC } from 'react'
import { IconTypes } from '@island.is/island-ui/core'
import { User } from 'oidc-client'
import { ServicePortalPath } from './navigation/paths'

/**
 * A navigational item used by the service portal
 */
export interface ServicePortalNavigationItem {
  name: string
  path?: ServicePortalPath
  external?: boolean
  icon?: IconTypes
  children?: ServicePortalNavigationItem[]
}

/**
 * The props provided to a service portal module
 */
export interface ServicePortalModuleProps {
  userInfo: User
}

/**
 * A rendered out by the render value of a service portal route
 */
export type ServicePortalModuleComponent = FC<ServicePortalModuleProps>

/**
 * The render value of a service portal route
 */
export type ServicePortalModuleRenderValue = LazyExoticComponent<
  ServicePortalModuleComponent
>

/**
 * A route defined by a service portal module
 */
export type ServicePortalRoute = {
  /**
   * The title of this route
   */
  name: string
  /**
   * Describes the path used to route to this component
   */
  path: ServicePortalPath
  /**
   * Routes are defined as exact by default
   * This flags it as a catch-all parent route that
   * defines it's own nested routing
   */
  catchAll?: boolean
  /**
   * The render value of this component
   */
  render: (userInfo: User) => ServicePortalModuleRenderValue
}

/**
 * A widget defined by a service portal module
 */
export type ServicePortalWidget = {
  /**
   * Describes the name of this widget, displayed on the dashboard above it fx.
   */
  name: string
  /**
   * Weight determines how widgets are sorted on the dashboard.
   * The lower the weight, the higher up it is
   */
  weight: number
  /**
   * The render value of this widget
   */
  render: (userInfo: User) => ServicePortalModuleRenderValue
}

export interface ServicePortalModule {
  /**
   * The title of this module
   */
  name: string
  /**
   * An optional render value of widgets that should
   * be displayed on the dashboard
   */
  widgets: (userInfo: User) => ServicePortalWidget[]
  /**
   * The routes defined by this module.
   * The service portal shell will define these as routes
   * within itself and use the provided render function to render out the component
   */
  routes: (userInfo: User) => ServicePortalRoute[]
  /**
   * Proposal:
   * All paths provided by this module.
   * These are used to determine what navigational items will be shown
   * in the sidebar, what breadcrumbs will be generated etc.
   */
  // paths: ServicePortalPath[]
}
