'use client'

import { FC, type PropsWithChildren } from 'react'

import clsx from 'clsx'

import { Header } from './components/Header/Header'


interface NavLayoutProps extends PropsWithChildren {
  isAuth: boolean
  disabledPadding?: boolean
}

export const NavLayout: FC<NavLayoutProps> = ({ isAuth, disabledPadding, children }) => {
  return (
    <div className="flex flex-col min-h-dvh">
      {isAuth && <Header isAuth={isAuth} />}
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
