export type Finance_DocumentScope =
  | 'finance.documents.read_only'
  | 'finance.documents.full_access'
export type Finance_LatestTransactions =
  | 'finance.latestTransactions.read_only'
  | 'finance.latestTransactions.full_access'

export type FinanceScope = Finance_DocumentScope | Finance_LatestTransactions

export type Scope = FinanceScope
