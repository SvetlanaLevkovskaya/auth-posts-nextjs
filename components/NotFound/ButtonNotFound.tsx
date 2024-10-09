'use client'

import type { FC } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/ui/Button/Button'


interface ButtonNotFoundProps {}

export const ButtonNotFound: FC<ButtonNotFoundProps> = () => {
	const { push } = useRouter()

	return (
		<Button
			color="white"
			size="l"
			className="w-full tb:w-[330px] mt-5"
			onClick={() => {
				push('/')
			}}
		>
			Go Home
		</Button>
	)
}
