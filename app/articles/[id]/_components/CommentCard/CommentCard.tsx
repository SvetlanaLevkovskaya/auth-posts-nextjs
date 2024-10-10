'use client'

import { FC, useState } from 'react'

import { Button } from '@/components/ui'

import { formattedDate } from '@/utils/formattedDate'

import {
  CommentChildren,
  CommentEditForm,
  CommentReplyForm,
} from '@/app/articles/[id]/_components/CommentCardItems'
import { token } from '@/app/constants'
import { apiClientService } from '@/app/services/clientApi'
import { Comment, CommentFormValues } from '@/types'


type Props = {
  comment: Comment
  articleId: number
}

export const CommentCard: FC<Props> = ({ comment, articleId }) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)

  const handleContentUpdated = async (data: CommentFormValues) => {
    try {
      await apiClientService.updateCommentContent(token, articleId, currentComment.id, {
        content: data.content,
      })
      setCurrentComment((prevComment) => ({
        ...prevComment,
        content: data.content,
      }))
      setIsEditing(false)
    } catch (error) {
      console.error('Ошибка при обновлении комментария:', error)
    }
  }

  const handleReply = async (data: CommentFormValues) => {
    try {
      const newReply = await apiClientService.addCommentToArticle(token, articleId, {
        content: data.content,
        parent: currentComment.id,
      })
      setCurrentComment((prevComment) => ({
        ...prevComment,
        children: [...prevComment.children, newReply.data],
      }))
      setIsReplying(false)
    } catch (error) {
      console.error('Ошибка при добавлении ответа:', error)
    }
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border-black border min-w-72">
      {isEditing ? (
        <CommentEditForm
          initialContent={currentComment.content}
          onSubmit={handleContentUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p className="mt-2 text-gray-4" onClick={() => setIsEditing(true)}>
            {currentComment.content}
          </p>
          <small className="text-gray-4 block mt-2">
            {currentComment?.author?.username || 'Anonymous'}
          </small>
          <small className="text-gray-4 block mt-1">
            {currentComment.updated !== currentComment.created
              ? `Обновлено: ${formattedDate(currentComment.updated)}`
              : `Опубликовано: ${formattedDate(currentComment.created)}`}
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
            Ответить
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
