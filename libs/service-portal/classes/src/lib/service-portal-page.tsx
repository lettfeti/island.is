import React, { Suspense } from 'react'
import {
  Scope,
  ServicePortalComponent,
  ServicePortalPageNavigation,
} from '@island.is/service-portal/types'

export interface ServicePortalPageConstructor {
  new (subjectScope: Array<Scope>): ServicePortalPage
}

export class ServicePortalPage {
  private _components: Array<ServicePortalComponent> = []
  private _navigation: ServicePortalPageNavigation
  constructor(private _subjectScope: Array<Scope>) {
    return this
  }

  public set components(components: Array<ServicePortalComponent>) {
    this._components = components.filter((i) =>
      i.availableScope.some((availableScope) =>
        this._subjectScope.includes(availableScope),
      ),
    )
  }

  public get availableScope() {
    return this._components
      .map((elem) => elem.availableScope)
      .reduce((prev, curr) => [...prev, ...curr], [])
  }

  public isAvailablePage(): boolean {
    return this._components.length > 0
  }

  public get navigation(): ServicePortalPageNavigation {
    return this.isAvailablePage() ? this._navigation : null
  }

  public set navigation(navigation) {
    this._navigation = navigation
  }

  public component = () => {
    return this.isAvailablePage() ? (
      <>
        {this._components.map((Elem, index) => (
          <Suspense fallback="Loading Component..." key={`component_${index}`}>
            {<Elem.component scope={this._subjectScope}></Elem.component>}
          </Suspense>
        ))}
      </>
    ) : null
  }
}
