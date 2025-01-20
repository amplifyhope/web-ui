export async function register() {
  if (process.env.NODE_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NODE_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
