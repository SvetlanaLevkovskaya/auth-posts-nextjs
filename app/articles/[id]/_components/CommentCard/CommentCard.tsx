'use client'

import { FC, useState } from 'react'

import { Button, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/clientApi'

import {
  CommentChildren,
  CommentEditForm,
  CommentReplyForm,
} from '@/app/articles/[id]/_components/CommentCardItems'
import { Comment, CommentFormData } from '@/types'
import { formattedDate } from '@/utils'


type Props = {
  comment: Comment
  articleId: number
}

export const CommentCard: FC<Props> = ({ comment, articleId }) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)

  const handleContentUpdated = async (data: CommentFormData) => {
    await apiClientService.updateCommentContent(articleId, currentComment.id, {
      content: data.content,
    })
    setCurrentComment((prevComment) => ({
      ...prevComment,
      content: data.content,
    }))
    setIsEditing(false)
    customToastSuccess('Комментарий успешно обновлен')
  }

  const handleReply = async (data: CommentFormData) => {
    const newReply = await apiClientService.addCommentToArticle(articleId, {
      content: data.content,
      parent: currentComment.id,
    })
    setCurrentComment((prevComment) => ({
      ...prevComment,
      children: [...prevComment.children, newReply],
    }))
    setIsReplying(false)
    customToastSuccess('Ответ на комментарий успешно добавлен')
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border min-w-72 mb-2">
      {isEditing ? (
        <CommentEditForm
          initialContent={currentComment.content}
          onSubmit={handleContentUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p className="mt-2 text-gray-3 break-words" onClick={() => setIsEditing(true)}>
            {currentComment.content}
          </p>
          <small className="text-gray-4 block mt-2">
            {currentComment?.author?.username || 'Anonymous'}
          </small>
          <small className="text-gray-4 block mt-1">
            {currentComment.updated !== currentComment.created
              ? `Updated: ${formattedDate(currentComment.updated)}`
              : `Published: ${formattedDate(currentComment.created)}`}
          </small>
          <Button
            color="grey"
            size="s"
            onClick={(e) => {
              e.stopPropagation()
              setIsReplying(!isReplying)
            }}
            className="mt-2 mb-2"
          >
            Reply
          </Button>
        </>
      )}

      {isReplying && !isEditing && (
        <CommentReplyForm onSubmit={handleReply} onCancel={() => setIsReplying(false)} />
      )}

      {currentComment?.children?.length > 0 && (
        <CommentChildren childrenComments={currentComment.children} articleId={articleId} />
      )}
    </li>
  )
}
