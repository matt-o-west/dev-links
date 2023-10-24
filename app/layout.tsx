import './globals.css'
import type { Metadata } from 'next'
import Providers from '@/context/Providers'
import ProfileContext from '@/context/ProfileContext'
import { Instrument_Sans } from 'next/font/google'

const instrument = Instrument_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={instrument.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
