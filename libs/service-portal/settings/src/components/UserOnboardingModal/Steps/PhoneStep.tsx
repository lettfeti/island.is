import React, { FC, useState } from 'react'
import { Button, GridColumn, GridRow, Text } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import {
  PhoneForm,
  PhoneFormInternalStep,
} from '../../Forms/PhoneForm/PhoneForm'
import { PhoneFormData } from '../../Forms/PhoneForm/Steps/FormStep'
import { defineMessage } from 'react-intl'

interface Props {
  tel: string
  natReg: string
  onBack: () => void
  onSubmit: (data: PhoneFormData) => void
}

export const PhoneStep: FC<Props> = ({ onBack, onSubmit, tel, natReg }) => {
  const { formatMessage } = useLocale()
  const [step, setStep] = useState<PhoneFormInternalStep>('form')

  const handleFormInternalStepChange = (value: PhoneFormInternalStep) =>
    setStep(value)

  return (
    <>
      <Text variant="h1" as="h1" marginBottom={3}>
        {step === 'form'
          ? formatMessage({
              id: 'service.portal:tel-number',
              defaultMessage: 'Símanúmer',
            })
          : formatMessage({
              id: 'service.portal:tel-confirm-code',
              defaultMessage: 'Staðfestingarkóði',
            })}
      </Text>
      <Text variant="intro" marginBottom={7}>
        {step === 'form'
          ? formatMessage({
              id: 'sp.settings:onboarding-phone-form-message',
              defaultMessage: `
                  Vinsamlegast sláðu inn símanúmerið þitt
                `,
            })
          : formatMessage({
              id: 'sp.settings:tel-confirm-form-message',
              defaultMessage: `
                  Staðfestingarkóði hefur verið sendur á símanúmerið þitt.
                  Skrifaðu kóðann inn hér að neðan.
                `,
            })}
      </Text>
      <PhoneForm
        tel={tel}
        natReg={natReg}
        onInternalStepChange={handleFormInternalStepChange}
        renderBackButton={() => (
          <Button variant="ghost" onClick={onBack}>
            {formatMessage({
              id: 'service.portal:go-back',
              defaultMessage: 'Til baka',
            })}
          </Button>
        )}
        submitButtonText={defineMessage({
          id: 'service.portal:next-step',
          defaultMessage: 'Næsta skref',
        })}
        onSubmit={onSubmit}
      />
    </>
  )
}
