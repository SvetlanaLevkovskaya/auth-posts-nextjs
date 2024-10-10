'use client'

import React, { FC } from 'react'

import { CommentContent, CommentIcons, LikeButton } from '@/app/articles/[id]/_components'
import { Comment } from '@/types'


type CommentCardProps = {
  comment: Comment
}

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  console.log('comment', comment)
  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border-black border min-w-72">
      <div className="flex justify-end mb-2">
        <LikeButton commentId={comment.id} />
      </div>
      <CommentContent content={comment.content} username={comment?.author?.username} />
      <CommentIcons commentId={comment.id} />

      {comment?.children?.length > 0 && (
        <ul>
          {comment.children.map((childComment) => (
            <CommentCard key={childComment.id} comment={childComment} />
          ))}
        </ul>
      )}
    </li>
  )
}
