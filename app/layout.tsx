import type { Metadata } from 'next'
import { Montserrat_Alternates, Montserrat, Roboto } from 'next/font/google'
import { Header } from 'components'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amplify Hope',
  description: 'Welcome to Amplify Hope',
  verification: {
    other: {
      'facebook-domain-verification': 'ihwx5q1c8c0dzkf11ebv0kfc1dvmj3'
    }
  }
}

export const montserrat_alternates = Montserrat_Alternates({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat_alternates'
})

export const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat'
})

export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat_alternates.variable} ${montserrat.variable} ${roboto.variable}`}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
