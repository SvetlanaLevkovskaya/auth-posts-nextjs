'use client'

import { FC, type PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Header } from './components/Header/Header'


interface NavLayoutProps extends PropsWithChildren {
  disabledPadding?: boolean
}

export const NavLayout: FC<NavLayoutProps> = ({ disabledPadding, children }) => {
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
