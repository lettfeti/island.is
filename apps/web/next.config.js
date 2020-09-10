const withTreat = require('next-treat')()
const withSourceMaps = require('@zeit/next-source-maps')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

// These modules need to be transpiled for IE11 support. This is not ideal,
// we should aim to drop IE11 support, or only use dependencies that have
// ES5 code (optionally plus ES6 module syntax).
const transpileModules = [
  'templite', // used by rosetta.
  '@sindresorhus/slugify',
  '@sindresorhus/transliterate', // Used by slugify.
  'escape-string-regexp', // Used by slugify.
]

const withTM = require('next-transpile-modules')(transpileModules)
const graphqlPath = '/api/graphql'

const {
  API_URL = 'http://localhost:4444',
  SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env

module.exports = withSourceMaps(
  withTreat(
    withTM({
      webpack: (config, options) => {
        if (!options.isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        if (SENTRY_DSN && SENTRY_AUTH_TOKEN && NODE_ENV === 'production') {
          config.plugins.push(
            new SentryWebpackPlugin({
              include: '.next',
              ignore: ['node_modules'],
              stripPrefix: ['webpack://_N_E/'],
              urlPrefix: `~/_next`,
              release: options.buildId,
            }),
          )
        }

        return config
      },

      cssModules: false,

      serverRuntimeConfig: {
        // Will only be available on the server side
        // Requests made by the server are internal request made directly to the api hostname
        graphqlUrl: API_URL,
        graphqlEndpoint: graphqlPath,
      },

      publicRuntimeConfig: {
        // Will be available on both server and client
        graphqlUrl: '',
        graphqlEndpoint: graphqlPath,
        SENTRY_DSN,
      },
    }),
  ),
)
