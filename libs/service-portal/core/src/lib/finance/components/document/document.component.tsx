import React, { FC } from 'react'
import { Finance_DocumentScope } from '@island.is/service-portal/types'

// Note: Returns available scopes
// Note: should be dynamically imported

interface Props {
  scope: Array<Finance_DocumentScope>
}

const FinanceDocuments: FC<Props> = ({ scope }) => {
  return (
    <div>
      <h1>Finance Document Component</h1>
      <h2>Scope: </h2>
      <ul>
        {scope.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default FinanceDocuments
