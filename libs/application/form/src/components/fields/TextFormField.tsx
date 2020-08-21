import React, { FC } from 'react'
import { TextField } from '@island.is/application/schema'
import { Box, Input, Typography } from '@island.is/island-ui/core'
import { FieldBaseProps } from '../../types'
import { useFormContext } from 'react-hook-form'
import InputContainer from '../Question/InputContainer'
import TopQuestionContainer from '../Question/TopQuestionContainer'

interface Props extends FieldBaseProps {
  field: TextField
}
const TextFormField: FC<Props> = ({ autoFocus, error, field, register }) => {
  const { id, name } = field
  const { clearErrors } = useFormContext()
  return (
    <>
      <TopQuestionContainer>
        <Typography variant="h2">{name}</Typography>
      </TopQuestionContainer>
      <InputContainer>
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
      </InputContainer>
    </>
  )
}

export default TextFormField
