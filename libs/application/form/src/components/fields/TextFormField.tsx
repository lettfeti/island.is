import React, { FC } from 'react'
import { TextField } from '@island.is/application/schema'
import { Box, Input, Typography } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { useFormContext } from 'react-hook-form'

interface Props extends FieldBaseProps {
  field: TextField
}
const TextFormField: FC<Props> = ({ autoFocus, error, field, register }) => {
  const { id, name } = field
  const { clearErrors } = useFormContext()
  return (
    <>
      <Box paddingX={[3, 3, 12]} marginBottom={6}>
        <Typography variant="h2">{name}</Typography>
      </Box>
      <Box paddingY={6} paddingX={[3, 3, 12]} background="blue100">
        <Input
          id={id}
          name={id}
          label={name}
          ref={register}
          autoFocus={autoFocus}
          hasError={error !== undefined}
          errorMessage={error}
          onChange={() => {
            if (error) {
              clearErrors(id)
            }
          }}
        />
      </Box>
    </>
  )
}

export default TextFormField
