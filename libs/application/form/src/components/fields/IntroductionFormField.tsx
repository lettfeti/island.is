import React, { FC } from 'react'
import { IntroductionField } from '@island.is/application/schema'
import { Typography } from '@island.is/island-ui/core'
import TopQuestionContainer from '../Question/TopQuestionContainer'

const IntroductionFormField: FC<{
  field: IntroductionField
  showFieldName: boolean
}> = ({ field, showFieldName }) => {
  return (
    <TopQuestionContainer>
      {showFieldName && <Typography variant="h2">{field.name}</Typography>}
      <Typography variant="p">{field.introduction}</Typography>
    </TopQuestionContainer>
  )
}

export default IntroductionFormField
