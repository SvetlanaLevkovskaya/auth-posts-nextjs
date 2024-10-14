'use client'

import type { FC } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/ui/Button/Button'

import { AppRoutes } from '@/lib/api/routes'


interface ButtonNotFoundProps {}

export const ButtonNotFound: FC<ButtonNotFoundProps> = () => {
  const { push } = useRouter()

  return (
    <Button
      color="white"
      size="l"
      className="w-full tb:w-[330px] mt-5"
      onClick={() => {
        push(AppRoutes.articles)
      }}
    >
      Go Home
    </Button>
  )
}
