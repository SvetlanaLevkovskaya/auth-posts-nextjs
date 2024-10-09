'use client'

import { FC, useEffect, useState } from 'react'


import { Comment } from '@/types'
import { CommentCard } from '@/app/articles/[id]/_components'


type CommentsProps = {
  comments: Comment[]
}

export const Comments: FC<CommentsProps> = ({ comments }) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <div className="mt-8">
      <hr className="bg-gray-3 my-4" />
      <h2 className="text-s_text font-bold mb-4">Comments ({comments.length})</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id}>
            <CommentCard comment={comment} />
          </div>
        ))}
      </ul>
    </div>
  )
}
