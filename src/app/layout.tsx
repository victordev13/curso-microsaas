/* eslint-disable camelcase */
import './globals.css'

import { Red_Hat_Display } from 'next/font/google'

const redhatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${redhatDisplay.className} bg-background—primary text-content-body`}
      >
        {children}
      </body>
    </html>
  )
}
