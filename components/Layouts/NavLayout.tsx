'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'

import { Header } from './ui/Header'


export const NavLayout = ({
  disabledPadding,
  children,
}: {
  disabledPadding?: boolean
  children: ReactNode
}) => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main
        className={clsx(
          'w-full h-full flex-center-center flex-grow bg-black text-white px-8 tb:pl-16 tb:pr-8',
          { ['p-6']: !disabledPadding }
        )}
      >
        {children}
      </main>
    </div>
  )
}
