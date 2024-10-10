'use client'

import { FC } from 'react'


type Props = {
  body: string
  email: string
}

export const CommentContent: FC<Props> = ({ body, email }) => {
  return (
    <>
      <p className="mt-2 text-gray-4">{body}</p>
      <small className="text-gray-4 block mt-2">{email}</small>
    </>
  )
}
