import React, { FC } from 'react'
import { Section } from '@island.is/application/schema'
import FormProgressSection from './FormProgressSection'
import { Box } from '@island.is/island-ui/core'

import * as styles from './FormProgress.treat'

const FormProgress: FC<{
  activeSection: number
  activeSubSection: number
  sections: Section[]
}> = ({ activeSection, activeSubSection, sections }) => {
  return (
    <Box paddingTop={2} width="full" className={styles.root}>
      <Box display="block">
        {sections.map((section, index) => (
          <FormProgressSection
            key={`${section.name}-${index}`}
            section={section}
            isActive={index === activeSection}
            isComplete={index < activeSection}
            sectionIndex={index}
            activeSubSection={activeSubSection}
          />
        ))}
      </Box>
    </Box>
  )
}

export default FormProgress
