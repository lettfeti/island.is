import React, { FC } from 'react'
import { Box } from '@island.is/island-ui/core'

import * as styles from './InputContainer.treat'

const TopQuestionContainer: FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    paddingTop={3}
    paddingBottom={6}
    paddingX={[3, 3, 12]}
    background="white"
    className={styles.root}
  >
    <Box position="relative" className={styles.alignmentContainer}>
      {children}
    </Box>
  </Box>
)

export default TopQuestionContainer
