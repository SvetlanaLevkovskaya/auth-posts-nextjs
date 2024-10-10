'use client'

import { FC } from 'react'


type Props = {
  content: string
  username: string
}

export const CommentContent: FC<Props> = ({ content, username }) => {
  return (
    <>
      <p className="mt-2 text-gray-4">{content}</p>
      <small className="text-gray-4 block mt-2">{username || 'Anonymous'}</small>
    </>
  )
}
