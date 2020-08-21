import React, { FC, useReducer } from 'react'
import { ApolloProvider } from '@apollo/client'

import { FormValue, Form } from '@island.is/application/schema'
import FormProgress from '../components/FormProgress/'
import ApplicationName from '../components/ApplicationName/'
import Sidebar from '../components/Sidebar'
import Screen from '../components/Screen'
import {
  ApplicationReducer,
  initializeReducer,
} from '../reducer/ApplicationFormReducer'
import { ActionTypes } from '../reducer/ReducerTypes'
import { Box, Column, Columns } from '@island.is/island-ui/core'
import { client } from '../graphql/client'
import * as styles from './ApplicationForm.treat'

type ApplicationProps = {
  form: Form
  initialAnswers: FormValue
}

const ApplicationFormBody: FC<ApplicationProps> = ({
  form,
  initialAnswers,
}) => {
  const [state, dispatch] = useReducer(
    ApplicationReducer,
    {
      form,
      formLeaves: [],
      formValue: initialAnswers,
      activeSection: 0,
      activeSubSection: 0,
      activeScreen: 0,
      progress: 0,
      screens: [],
      sections: [],
    },
    initializeReducer,
  )
  const {
    activeSection,
    activeSubSection,
    activeScreen,
    formValue,
    sections,
    screens,
  } = state

  return (
    <Box paddingX={5} flexGrow={1}>
      <Columns reverse collapseBelow="md">
        <Column width="3/12">
          <Sidebar>
            <ApplicationName name={form.name} icon={form.icon} />
            <FormProgress
              sections={sections}
              activeSection={activeSection}
              activeSubSection={activeSubSection}
            />
          </Sidebar>
        </Column>

        <Column width="1/12">&nbsp;</Column>

        <Column width="8/12">
          <Screen
            answerQuestions={(payload) =>
              dispatch({ type: ActionTypes.ANSWER, payload })
            }
            dataSchema={form.schema}
            formTypeId={form.id}
            formValue={formValue}
            expandRepeater={() =>
              dispatch({ type: ActionTypes.EXPAND_REPEATER })
            }
            nextScreen={() => dispatch({ type: ActionTypes.NEXT_SCREEN })}
            prevScreen={() => dispatch({ type: ActionTypes.PREV_SCREEN })}
            shouldSubmit={activeScreen === screens.length - 1}
            screen={screens[activeScreen]}
            section={sections[activeSection]}
          />
          {/* </Box> */}
        </Column>
      </Columns>
    </Box>
  )
}

export const ApplicationForm = (props: ApplicationProps) => (
  <ApolloProvider client={client}>
    <ApplicationFormBody {...props} />
  </ApolloProvider>
)
