import React, { FC } from 'react'
import { Route } from 'react-router-dom'

import {
  Scope,
  ServicePortalPageNavigation,
  ServicePortalComponent,
} from '@island.is/service-portal/types'
import {
  ServicePortalPageConstructor,
  ServicePortalPage,
} from './service-portal-page'

export interface ServicePortalModuleConstructor {
  new (subjectScope: Array<Scope>): ServicePortalModule
}

export class ServicePortalModule {
  private _allPages: Array<ServicePortalPage>
  private _navItems: Array<ServicePortalPageNavigation>
  private _dashboard: Array<ServicePortalComponent> = []

  constructor(private subjectScope: Array<Scope>) {}

  public set pages(pages: ServicePortalPageConstructor[]) {
    this._allPages = pages
      .map((page) => new page(this.subjectScope))
      .filter((x) => x.isAvailablePage())

    this._navItems = this._allPages.map((page) => page.navigation)
  }

  public get navItems() {
    return this._navItems
  }

  public get dashboard() {
    return this._dashboard
  }

  public routes = () => {
    return (
      <>
        {this._allPages.map((page) => (
          <Route
            key={page.navigation.path}
            path={page.navigation.path}
            component={page.component}
          />
        ))}
      </>
    )
  }
}
