import { Document } from '../components/document'
import { Scope } from '@island.is/service-portal/types'
import { ServicePortalPage } from '@island.is/service-portal/classes'

export class FinancePage extends ServicePortalPage {
  constructor(props: Array<Scope>) {
    super(props)
    this.components = [Document]
    this.navigation = {
      group: 'information',
      label: 'Fjármál',
      path: '/finance',
    }
  }
}
