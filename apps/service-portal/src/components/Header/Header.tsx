import React, { FC } from 'react'
import { removeToken } from '../../auth/utils'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { MOCK_AUTH_KEY } from '@island.is/service-portal/constants'
import SubjectSwitcher from './SubjectSwitcher/SubjectSwitcher'
import { Logo, Box, Hidden, Columns, Column } from '@island.is/island-ui/core'
import * as styles from './Header.treat'

export const Header: FC<{}> = () => {
  const history = useHistory()

  const handleLogout = async () => {
    await removeToken()
    // TODO: Loading state, Hard reload?
    localStorage.removeItem(MOCK_AUTH_KEY)
    history.push('/innskraning')
  }

  return (
    <header className={styles.header}>
      <Box
        width="full"
        paddingTop={1}
        paddingBottom={1}
        paddingRight={3}
        paddingLeft={3}
      >
        <Columns>
          <Column width="8/12">
            <Link to="/">
              <Box display="flex" height="full" alignItems="center">
                <Hidden above="md">
                  <Logo width={40} iconOnly />
                </Hidden>
                <Hidden below="lg">
                  <Logo width={160} />
                </Hidden>
              </Box>
            </Link>
          </Column>
          <Column width="3/12">
            <SubjectSwitcher />
          </Column>
          <Column width="1/12">
            <Box
              display="flex"
              height="full"
              alignItems="center"
              marginLeft={1}
            >
              <button onClick={handleLogout}>Útskráning</button>
            </Box>
          </Column>
        </Columns>
      </Box>
    </header>
  )
}

export default Header
