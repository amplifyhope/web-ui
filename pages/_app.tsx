import { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import { Favicon, Header } from 'components'
import Head from 'next/head'
import '../styles/globals.css'

export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  return (
    <div>
      <Head>
        <title>Amplify Hope</title>
        <Favicon />
        <meta
          name='facebook-domain-verification'
          content='ihwx5q1c8c0dzkf11ebv0kfc1dvmj3'
        />
      </Head>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
