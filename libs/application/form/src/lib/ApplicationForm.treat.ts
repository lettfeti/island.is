import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const screenContainer = style({
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      borderWidth: 1,
      borderStyle: theme.border.style.solid,
      borderColor: theme.color.blue200,
    },
  },
})
