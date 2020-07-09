import React, { lazy, Suspense } from 'react'

const LatestTransactions = lazy(() =>
  import('../components/latestTransactions'),
)
const UnpaidBills = lazy(() => import('../components/unpaidBills'))
const FinanceDocuments = lazy(() => import('../components/financeDocuments'))

const hasPermission = (key: string, scope: Array<string>) => scope.includes(key)

const FinanceScreen = ({ scope }) => {
  return (
    <>
      {hasPermission('finance.unpaidBills', scope) && (
        <Suspense fallback="loading">
          <UnpaidBills />
        </Suspense>
      )}
      {hasPermission('finance.latestTransactions', scope) && (
        <Suspense fallback="loading">
          <LatestTransactions />
        </Suspense>
      )}
      {hasPermission('finance.documents', scope) && (
        <Suspense fallback="loading">
          <FinanceDocuments />
        </Suspense>
      )}
    </>
  )
}

export default FinanceScreen
