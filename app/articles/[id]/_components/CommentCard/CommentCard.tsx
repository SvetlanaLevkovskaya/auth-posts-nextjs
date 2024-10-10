'use client'

import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui'

import { TextArea } from '@/ui/TextArea/TextArea'

import { token } from '@/app/constants'
import { apiClientService } from '@/app/services/clientApi'
import { Comment } from '@/types'


type CommentCardProps = {
  comment: Comment
  articleId: number
}

type CommentFormValues = {
  content: string
}

export const CommentCard: FC<CommentCardProps> = ({ comment, articleId }) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<CommentFormValues>({
    defaultValues: { content: currentComment.content },
  })

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(handleContentUpdated)()
    }
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border-black border min-w-72">
      {isEditing ? (
        <form onSubmit={handleSubmit(handleContentUpdated)}>
          <TextArea
            register={register('content', { required: 'Поле обязательно для заполнения' })}
            onKeyDown={handleKeyDown}
            error={errors.content?.message}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button color="neon" size="m" >
              Сохранить
            </Button>
            <Button color="purple" size="m"  onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
          </div>
        </form>
      ) : (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer">
          <p className="mt-2 text-gray-4">{currentComment.content}</p>
          <small className="text-gray-4 block mt-2">
            {currentComment?.author?.username || 'Anonymous'}
          </small>
        </div>
      )}

      {currentComment?.children?.length > 0 && (
        <ul>
          {currentComment.children.map((childComment) => (
            <CommentCard key={childComment.id} comment={childComment} articleId={articleId} />
          ))}
        </ul>
      )}
    </li>
  )
}
