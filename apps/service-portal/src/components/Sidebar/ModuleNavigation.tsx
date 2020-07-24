import React, { FC } from 'react'
import { ServicePortalNavigationItem } from '@island.is/service-portal/core'
import { Box, Icon, Typography } from '@island.is/island-ui/core'
import { Link, useLocation } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
import * as styles from './Sidebar.treat'
import cn from 'classnames'

interface Props {
  nav: ServicePortalNavigationItem
}

const ModuleNavigation: FC<Props> = ({ nav }) => {
  const location = useLocation()
  const isModuleActive = location.pathname.includes(nav.url)

  return (
    <Box marginBottom={2}>
      <Link
        to={nav.url}
        className={cn(styles.navItem, {
          [styles.navItemActive]: isModuleActive,
        })}
      >
        <Box display="flex" alignItems="center">
          {nav.icon && (
            <Box marginRight={3}>
              <Icon
                type={nav.icon}
                color={isModuleActive ? 'blue400' : 'dark300'}
              />
            </Box>
          )}
          <div>{nav.name}</div>
        </Box>
      </Link>
      {nav.children && (
        <AnimateHeight duration={300} height={isModuleActive ? 'auto' : 0}>
          <Box paddingLeft={5} paddingTop={3}>
            {nav.children.map((child, index) => (
              <Link
                to={child.url}
                key={`child-${index}`}
                className={cn(styles.navItem, styles.subNavItem, {
                  [styles.navItemActive]: location.pathname === child.url,
                })}
              >
                {child.name}
              </Link>
            ))}
          </Box>
        </AnimateHeight>
      )}
    </Box>
  )
}

export default ModuleNavigation
