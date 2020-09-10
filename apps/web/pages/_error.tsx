import React from 'react'
import { NextPageContext } from 'next'
import NextErrorComponent, { ErrorProps } from 'next/error'
import * as Sentry from '@sentry/node'

interface ErrorInitialProps extends ErrorProps {
  hasGetInitialPropsRun: boolean
  err: Error & { statusCode?: number }
}

function CustomError({
  statusCode,
  hasGetInitialPropsRun,
  title,
  err,
}: Partial<ErrorInitialProps>) {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err)
  }

  return (
    <h1>
      Error: {statusCode}: {title}
    </h1>
  )
}

CustomError.getInitialProps = async (
  ctx: NextPageContext,
): Promise<ErrorProps> => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps(
    ctx,
  )) as ErrorInitialProps

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  if (ctx.res?.statusCode === 404) {
    return { statusCode: 404 }
  }

  if (ctx.err) {
    Sentry.captureException(ctx.err)
    await Sentry.flush(2000)
    return errorInitialProps
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${ctx.asPath}`),
  )

  await Sentry.flush(2000)

  return errorInitialProps
}

export default CustomError
