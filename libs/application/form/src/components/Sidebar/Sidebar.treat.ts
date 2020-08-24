import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const root = style({
  '@media': {
    [`screen and (min-width: ${theme.breakpoints.md}px)`]: {
      //
    },
  },
})
