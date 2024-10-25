'use client'

import { CommentCard } from '@/app/articles/[id]/_components'
import { Comment } from '@/types'


export const CommentChildren = ({
  childrenComments,
  articleId,
}: {
  childrenComments: Comment[]
  articleId: number
}) => (
  <ul>
    {childrenComments.map((childComment, index) => {
      return (
        <CommentCard
          key={`${childComment.id}-${index}`}
          comment={childComment}
          articleId={articleId}
        />
      )
    })}
  </ul>
)
