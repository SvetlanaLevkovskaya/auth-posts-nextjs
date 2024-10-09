import { ReactNode, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Spinner } from '@/components/ui'

import './globals.css'

import AuthProvider from '@/app/providers/authProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles',
  twitter: {
    title: 'Articles',
    description: 'Articles',
    images: 'https://og-examples.vercel.sh/api/static',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Suspense fallback={<Spinner />}>
          <ToastContainer limit={1} />
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
