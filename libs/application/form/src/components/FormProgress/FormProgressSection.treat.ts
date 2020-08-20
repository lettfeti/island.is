import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const root = style({
  borderTopWidth: 1,
  borderTopColor: theme.color.purple200,
  borderTopStyle: 'solid',
  transition: 'margin-left .5s ease',
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      transition: 'none',
    },
  },
})

export const sectionNumber = style({
  left: `-${theme.spacing[6] - theme.spacing[1] / 2}px`,
})

export const sectionNameActive = style({
  fontWeight: theme.typography.semiBold,
})
