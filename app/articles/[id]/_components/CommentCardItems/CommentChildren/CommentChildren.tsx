import { FC } from 'react'

import { CommentCard } from '@/app/articles/[id]/_components'
import { Comment } from '@/types'


type Props = {
  childrenComments: Comment[]
  articleId: number
}

export const CommentChildren: FC<Props> = ({ childrenComments, articleId }) => (
  <ul>
    {childrenComments.map((childComment, index) => (
      <CommentCard
        key={`${childComment.id}-${index}`}
        comment={childComment}
        articleId={articleId}
      />
    ))}
  </ul>
)
