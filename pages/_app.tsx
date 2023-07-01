import { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
      </Head>
      <Script
        strategy='afterInteractive'
        src='https://www.googletagmanager.com/'
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];cd ../
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `
        }}
      />
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
