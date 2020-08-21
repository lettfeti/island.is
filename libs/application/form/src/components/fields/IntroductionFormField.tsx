import React, { FC } from 'react'
import { IntroductionField } from '@island.is/application/schema'
import { Typography, Box } from '@island.is/island-ui/core'

const IntroductionFormField: FC<{
  field: IntroductionField
  showFieldName: boolean
}> = ({ field, showFieldName }) => {
  return (
    <Box paddingX={[3, 3, 12]}>
      {showFieldName && <Typography variant="h2">{field.name}</Typography>}
      <Typography variant="p">{field.introduction}</Typography>
    </Box>
  )
}

export default IntroductionFormField
