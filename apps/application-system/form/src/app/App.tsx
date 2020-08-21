import React from 'react'

import { Route } from 'react-router-dom'

import { ApplicationForm } from '@island.is/application/form'
import { ExampleForm3 } from '@island.is/application/schema'
import {
  Header,
  Box,
  Breadcrumbs,
  Typography,
  Column,
  Columns,
} from '@island.is/island-ui/core'

import * as styles from './App.treat'

export const App = () => {
  return (
    <Box className={styles.root}>
      <Route path="/">
        <Box paddingX={[3, 3, 5]}>
          <Header authenticated userName="Jóna Sigurðardóttir" />
        </Box>
        <Box paddingX={5}>
          <Columns collapseBelow="md">
            <Column width="1/12">&nbsp;</Column>
            <Column width="6/12">
              <Box paddingY="containerGutter">
                <Box paddingY="gutter">
                  <Breadcrumbs>
                    <span>Ísland.is</span>
                    <a href="/">Applications</a>
                    <a href="/">Driver's License</a>
                  </Breadcrumbs>
                </Box>
                <Typography variant="h1">
                  Application for driving lessons
                </Typography>
                <Typography variant="intro">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  ut neque blandit, gravida ex eu, pulvinar nisi.
                </Typography>
              </Box>
            </Column>
          </Columns>
        </Box>
        <ApplicationForm form={ExampleForm3} initialAnswers={{}} />
      </Route>
    </Box>
  )
}

export default App
