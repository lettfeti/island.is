import React, { FC, useRef, useState, useEffect } from 'react'
import { Section, getSubSectionsInSection } from '@island.is/application/schema'
import { BulletList, Box, Typography } from '@island.is/island-ui/core'
import SectionNumber from '../SectionNumber'
import SubSectionItem from '../SubSectionItem'

import * as styles from './FormProgressSection.treat'
import { theme } from '@island.is/island-ui/theme'

const FormProgressSection: FC<{
  section: Section
  sectionIndex: number
  isActive: boolean
  isComplete: boolean
  activeSubSection: number
}> = ({ section, sectionIndex, isActive, isComplete, activeSubSection }) => {
  const subSections = getSubSectionsInSection(section)
  const hasSubSections = subSections.length > 0
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const isClient = typeof window === 'object'

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= theme.breakpoints.md)
      setWidth(containerRef?.current?.offsetWidth || 0)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isClient])

  return (
    <Box
      ref={containerRef}
      marginBottom={2}
      paddingTop={2}
      className={styles.root}
      style={{
        marginLeft: isSmallScreen && isComplete ? `-${width}px` : '0',
      }}
    >
      <Box
        display="flex"
        alignItems="flexStart"
        marginBottom={1}
        style={{ whiteSpace: 'nowrap' }}
        position="relative"
      >
        <Box
          padding={1}
          marginRight={3}
          position="absolute"
          className={styles.sectionNumber}
        >
          <SectionNumber
            currentState={
              isActive ? 'active' : isComplete ? 'previous' : 'next'
            }
            number={sectionIndex + 1}
          />
        </Box>
        <Typography variant={isActive ? 'h4' : 'p'} color="dark400">
          {!isActive && <span>{sectionIndex + 1}. </span>}
          {section.name}
        </Typography>
      </Box>
      {isActive && hasSubSections && (
        <Box display="block">
          <BulletList>
            {subSections.map((subSection, i) => (
              <SubSectionItem
                key={`${subSection.name}-${i}`}
                currentState={
                  i === activeSubSection
                    ? 'active'
                    : i < activeSubSection
                    ? 'previous'
                    : 'next'
                }
              >
                {subSection.name}
              </SubSectionItem>
            ))}
          </BulletList>
        </Box>
      )}
    </Box>
  )
}

export default FormProgressSection
