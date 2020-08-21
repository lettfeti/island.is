import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SelectField } from '@island.is/application/schema'
import { Typography, Select, Option, Box } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'

interface Props extends FieldBaseProps {
  field: SelectField
}
const SelectFormField: FC<Props> = ({
  error,
  showFieldName = false,
  field,
}) => {
  const { id, name, options, placeholder } = field

  const { clearErrors } = useFormContext()
  return (
    <div>
      <Box paddingX={[3, 3, 12]} marginBottom={6}>
        <Typography variant="h2">{name}</Typography>
      </Box>
      <Controller
        defaultValue=""
        name={id}
        render={({ onChange, value }) => (
          <Box
            paddingY={6}
            paddingX={[3, 3, 12]}
            marginTop={6}
            background="blue100"
          >
            <Select
              hasError={error !== undefined}
              errorMessage={error}
              name={id}
              options={options}
              label={name}
              placeholder={placeholder}
              value={options.find((option) => option.value === value)}
              onChange={(newVal) => {
                clearErrors(id)
                onChange((newVal as Option).value)
              }}
            />
          </Box>
        )}
      />
    </div>
  )
}

export default SelectFormField
