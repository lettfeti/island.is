import React from 'react'
import { AppProps, AppContext, AppInitialProps } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from '@apollo/client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { FooterLinkProps } from '@island.is/island-ui/core'
import getConfig from 'next/config'
import { NextComponentType } from 'next'
import * as Sentry from '@sentry/node'
import get from 'lodash/get'
import { RewriteFrames } from '@sentry/integrations'

import appWithTranslation from '../i18n/appWithTranslation'
import initApollo from '../graphql/client'
import Layout from '../layouts/main'
import { withErrorBoundary } from '../units/ErrorBoundary'
import { withHealthchecks } from '../units/Healthchecks/withHealthchecks'

interface AppCustomProps extends AppProps {
  layoutProps: {
    footerUpperMenu: FooterLinkProps[]
    footerLowerMenu: FooterLinkProps[]
    footerTagsMenu: FooterLinkProps[]
    footerMiddleMenu: FooterLinkProps[]
    namespace: Record<string, string>
  }
}

interface AppCustomContext extends AppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

type SupportApplicationProps = NextComponentType<
  AppCustomContext,
  AppInitialProps,
  AppCustomProps & {
    err: Error & { statusCode?: number }
    apolloState: NormalizedCacheObject
  }
>

const {
  publicRuntimeConfig: { SENTRY_DSN },
  serverRuntimeConfig: { rootDir },
} = getConfig()

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(
            `${rootDir}/.next`,
            'app:///_next',
          )
          return frame
        },
      }),
    ],
  })
}

const SupportApplication: SupportApplicationProps = ({
  Component,
  pageProps,
  layoutProps,
  router,
  err,
  apolloState,
}) => {
  const { showSearchInHeader } = pageProps
  const lang = router.pathname.startsWith('en') ? 'en' : 'is'

  Sentry.configureScope((scope) => {
    scope.setExtra('lang', lang)

    scope.setContext('router', {
      route: router.route,
      pathname: router.pathname,
      query: router.query,
      asPath: router.asPath,
    })
  })

  Sentry.addBreadcrumb({
    category: 'pages/_app',
    message: `Rendering app for Component "${get(
      Component,
      'name',
      'unknown',
    )}" (${process.browser ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  })

  return (
    <ApolloProvider client={initApollo(apolloState)}>
      <Layout showSearchInHeader={showSearchInHeader} {...layoutProps}>
        <Component {...pageProps} err={err} />
      </Layout>
    </ApolloProvider>
  )
}

SupportApplication.getInitialProps = async ({ Component, ctx }) => {
  const apolloClient = initApollo({})

  const customContext = {
    ...ctx,
    apolloClient,
  }

  const pageProps = (await Component.getInitialProps(customContext)) as any
  const layoutProps = await Layout.getInitialProps({
    ...customContext,
    locale: pageProps.locale,
  })

  const apolloState = apolloClient.cache.extract()

  return {
    layoutProps: {
      ...layoutProps,
      ...pageProps.layoutConfig,
    },
    pageProps,
    apolloState,
  }
}

const { serverRuntimeConfig } = getConfig()
const { graphqlUrl } = serverRuntimeConfig
const externalEndpointDependencies = [graphqlUrl]

export default appWithTranslation(
  withHealthchecks(externalEndpointDependencies)(
    withErrorBoundary(SupportApplication),
  ),
)
