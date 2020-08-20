import { style } from 'treat'
import { theme } from '@island.is/island-ui/theme'

export const number = style({
  width: 24,
  height: 24,
  color: theme.color.white,
  fontSize: 18,
  lineHeight: 0,
  borderRadius: '50%',
  top: -5,
  left: -7,
})

export const bullet = style({
  top: -8,
  left: 1,
})
