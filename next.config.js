/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  }
}

const sentryWebpackPluginOptions = {
  org: 'amplifyhope',
  project: 'web-ui'
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
