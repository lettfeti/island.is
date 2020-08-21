import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SelectField } from '@island.is/application/schema'
import { Typography, Select, Option, Box } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import InputContainer from '../Question/InputContainer'
import TopQuestionContainer from '../Question/TopQuestionContainer'

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
      <TopQuestionContainer>
        <Typography variant="h2">{name}</Typography>
      </TopQuestionContainer>
      <Controller
        defaultValue=""
        name={id}
        render={({ onChange, value }) => (
          <InputContainer>
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
          </InputContainer>
        )}
      />
    </div>
  )
}

export default SelectFormField
