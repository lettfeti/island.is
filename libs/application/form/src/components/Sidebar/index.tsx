import React, { FC, useState } from 'react'
import { Box } from '@island.is/island-ui/core'
import * as styles from './Sidebar.treat'

const Sidebar: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Box
      background="purple100"
      borderRadius="large"
      paddingX={4}
      paddingTop={3}
      paddingBottom={2}
      className={styles.root}
    >
      {children}
    </Box>
  )
}

export default Sidebar
