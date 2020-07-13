import { Scope } from '@island.is/service-portal/types'
import { ServicePortalModule } from '@island.is/service-portal/classes'
import { FinancePage } from './pages'

export default class FinanceModule extends ServicePortalModule {
  constructor(subjectScope: Array<Scope>) {
    super(subjectScope)
    this.pages = [FinancePage]
  }
}
