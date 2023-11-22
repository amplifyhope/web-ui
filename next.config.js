/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  output: 'standalone'
}

const sentryWebpackPluginOptions = {
  org: 'amplifyhope',
  project: 'web-api'
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
