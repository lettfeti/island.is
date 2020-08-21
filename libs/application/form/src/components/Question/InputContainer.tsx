import React, { FC } from 'react'
import { Box } from '@island.is/island-ui/core'

import * as styles from './InputContainer.treat'

const InputContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    paddingY={6}
    paddingX={[3, 3, 12]}
    background="blue100"
    className={styles.root}
  >
    <Box position="relative" className={styles.alignmentContainer}>
      {children}
    </Box>
  </Box>
)

export default InputContainer
