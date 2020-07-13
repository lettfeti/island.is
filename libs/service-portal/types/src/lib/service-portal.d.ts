export interface ServicePortalNavigation {
  routes: any[]
}

export interface ServicePortalModuleRoute {
  group?: 'action' | 'information' | 'hidden' | 'child'
  label: string
  path: string
  scope: string[]
  Component: React.FC<any>
  navItems?: Array<ServicePortalModuleRoute>
}

// export interface ServicePortalModule {
//   (scope: Array<Scope>): {
//     component: React.FC<any>
//     dashboard: React.Component[]
//     navItems: any[]
//   }
// }

export interface ServicePortalComponent {
  availableScope: Array<Scope>
  component: React.ExoticComponent<any>
}

export interface ServicePortalScreen {
  (scope: Array<Scope>): {
    availableScope: Array<Scope>
    Component: React.FC<any>
    navigation: {
      group?: 'action' | 'information' | 'hidden' | 'child'
      label: string
      path: string
    }
  }
}

export interface ServicePortalPageNavigation {
  group?: 'action' | 'information' | 'hidden' | 'child'
  label: string
  path: string
  children?: Array<ServicePortalPageNavigation>
}
