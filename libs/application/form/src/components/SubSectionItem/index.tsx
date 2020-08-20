import React, { FC } from 'react'
import * as styles from './SubSectionItem.treat'
import { Icon, Typography, Box } from '@island.is/island-ui/core'

interface SubSectionItemProps {
  currentState: 'active' | 'previous' | 'next'
  children: React.ReactNode
}

export const SubSectionItem: FC<SubSectionItemProps> = ({
  currentState,
  children,
}) => (
  <Typography
    variant="p"
    as="span"
    color={
      currentState === 'active'
        ? 'purple400'
        : currentState === 'previous'
        ? 'dark400'
        : 'dark400'
    }
  >
    <Box>{children}</Box>
  </Typography>
)

export default SubSectionItem
