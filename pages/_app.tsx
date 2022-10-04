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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div>
        <Header />
        <Component {...pageProps} />
      </div>
    </div>
  )
}
