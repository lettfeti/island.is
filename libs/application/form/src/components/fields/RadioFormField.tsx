import React, { FC } from 'react'
import { RadioField } from '@island.is/application/schema'
import {
  Typography,
  Box,
  RadioButton,
  Stack,
  Tooltip,
} from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { useFormContext, Controller } from 'react-hook-form'
import { getValueViaPath } from '../../utils'
import InputContainer from '../Question/InputContainer'
import TopQuestionContainer from '../Question/TopQuestionContainer'

interface Props extends FieldBaseProps {
  field: RadioField
}
const RadioFormField: FC<Props> = ({
  showFieldName = false,
  field,
  error,
  formValue,
}) => {
  const { id, name, options } = field
  const { clearErrors, setValue } = useFormContext()
  return (
    <>
      <TopQuestionContainer>
        <Typography variant="h2">{name}</Typography>
      </TopQuestionContainer>
      <InputContainer>
        <Controller
          name={`${id}`}
          defaultValue={getValueViaPath(formValue, id)}
          render={({ value, onChange }) => {
            return (
              <Stack space={2}>
                {options.map((option, index) => (
                  <Box display="flex" alignItems="center" key={option.value}>
                    <RadioButton
                      key={`${id}-${index}`}
                      onChange={({ target }) => {
                        clearErrors(id)
                        onChange(target.value)
                        setValue(id, target.value)
                      }}
                      checked={option.value === value}
                      id={`${id}-${index}`}
                      name={`${id}`}
                      label={option.label}
                      value={option.value}
                      errorMessage={
                        index === options.length - 1 ? error : undefined
                      }
                      hasError={error !== undefined}
                    />
                    {option.tooltip && (
                      <Box marginLeft={1}>
                        <Tooltip placement="top" text={option.tooltip} />
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            )
          }}
        />
      </InputContainer>
    </>
  )
}

export default RadioFormField
