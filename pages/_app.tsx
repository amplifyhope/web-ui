import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { AppLayout, Favicon } from 'components';
import Head from 'next/head';
import '../styles/app.scss';

export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  return (
    <div>
      <Head>
        <title>Amplify Hope</title>
        <Favicon />
      </Head>
      <AppLayout>
        <div className="app">
          <Component {...pageProps} />
        </div>
      </AppLayout>
    </div>
  );
}
