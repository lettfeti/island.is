import React, { FC } from 'react'
import { Box, Icon } from '@island.is/island-ui/core'

import * as styles from './SectionNumber.treat'

interface SectionNumberProps {
  currentState: 'active' | 'previous' | 'next'
  number: number
}

const SectionNumber: FC<SectionNumberProps> = ({ currentState, number }) => (
  <Box position="relative">
    {(currentState === 'next' && (
      <Box position="absolute" className={styles.bullet}>
        <Icon type="bullet" color="purple200" width="8" height="8" />
      </Box>
    )) || (
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        textAlign="center"
        background={
          currentState === 'active'
            ? 'purple400'
            : currentState === 'previous'
            ? 'purple200'
            : 'purple200'
        }
        justifyContent="center"
        pointerEvents="none"
        className={styles.number}
      >
        {(currentState === 'previous' && (
          <Icon type="check" color="purple400" width="12" height="12" />
        )) ||
          number}
      </Box>
    )}
  </Box>
)

export default SectionNumber
