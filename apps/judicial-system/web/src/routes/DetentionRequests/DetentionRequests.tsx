import React, { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import localeIS from 'date-fns/locale/is'

import { Logo } from '@island.is/judicial-system-web/src/shared-components/Logo/Logo'
import {
  Alert,
  Button,
  Typography,
  Tag,
  TagVariant,
} from '@island.is/island-ui/core'
import { Case, CaseState } from '../../types'
import * as api from '../../api'
import * as styles from './DetentionRequests.treat'

export const DetentionRequests: React.FC = () => {
  const [cases, setCases] = useState<Case[]>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    async function getCases() {
      const response = await api.getCases()
      if (isMounted) {
        setCases(response)
        setIsLoading(false)
      }
    }

    getCases()
    return () => {
      isMounted = false
    }
  }, [])

  const mapCaseStateToTagVariant = (state: string): TagVariant => {
    switch (state) {
      case 'DRAFT':
        return 'red'
      case 'SUBMITTED':
        return 'purple'
      case 'ACTIVE':
        return 'darkerMint'
      case 'COMPLETED':
        return 'blue'
      default:
        return 'white'
    }
  }

  return (
    <div className={styles.detentionRequestsContainer}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.addDetentionRequestButtonContainer}>
        <Button icon="plus" href="/stofna-krofu/grunnupplysingar">
          Stofna nýja kröfu
        </Button>
      </div>
      {isLoading ? null : cases ? (
        <table
          className={styles.detentionRequestsTable}
          data-testid="detention-requests-table"
        >
          <Typography as="caption" variant="h3">
            Gæsluvarðhaldskröfur
          </Typography>
          <thead>
            <tr>
              <th>LÖKE málsnr.</th>
              <th>Nafn grunaða</th>
              <th>Kennitala</th>
              <th>Krafa stofnuð</th>
              <th>Staða</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr key={i} data-testid="detention-requests-table-row">
                <td>{c.policeCaseNumber || '-'}</td>
                <td>{c.suspectName}</td>
                <td>{c.suspectNationalId || '-'}</td>
                <td>
                  {format(parseISO(c.created), 'PP', { locale: localeIS })}
                </td>
                <td>
                  <Tag variant={mapCaseStateToTagVariant(c.state)} label>
                    {CaseState[c.state]}
                  </Tag>
                </td>
                <td>
                  <Button href="/" icon="arrowRight" variant="text">
                    Opna kröfu
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div
          className={styles.detentionRequestsError}
          data-testid="detention-requests-error"
        >
          <Alert
            title="Ekki tókst að sækja gögn úr gagnagrunni"
            message="Ekki tókst að ná sambandi við gagnagrunn. Málið hefur verið skráð og viðeigandi aðilar látnir vita. Vinsamlega reynið aftur síðar"
            type="error"
          />
        </div>
      )}
    </div>
  )
}

export default DetentionRequests
