'use client'

import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/ui/Button/Button'
import { Input } from '@/ui/Input/Input'

import { CommentCard } from '@/app/articles/[id]/_components'
import { token } from '@/app/constants'
import { apiClientService } from '@/app/services/clientApi'
import { Comment, CommentFormValues } from '@/types'


type Props = {
  articleId: number
  initialComments: Comment[]
}

export const Comments: FC<Props> = ({ articleId, initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [loading, setLoading] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  })

  useEffect(() => {
    setHydrated(true)
  }, [])

  const handleAddComment = async (data: CommentFormValues) => {
    setLoading(true)
    try {
      const newComment = await apiClientService.addCommentToArticle(token, articleId, {
        content: data.content,
      })
      setComments((prevComments) => [...prevComments, newComment.data])
      reset()
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(handleAddComment)()
    }
  }

  if (!hydrated) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-s_text font-bold mb-4">Comments ({comments?.length})</h2>

      <form onSubmit={handleSubmit(handleAddComment)} className="flex items-center gap-4 mb-4">
        <Input
          register={register('content', { required: 'Поле обязательно для заполнения' })}
          placeholder="Напишите ваш комментарий..."
          error={errors.content?.message}
          disabled={loading}
          className="bg-gray-3 text-white flex-grow rounded-md"
          onKeyDown={handleKeyDown}
        />
        <Button disabled={loading} size="m" color="neon">
          {loading ? 'Отправка...' : 'Оставить комментарий'}
        </Button>
      </form>

      <hr className="bg-gray-3 my-4" />

      <ul className="space-y-4">
        {comments.map((comment, index) => (
          <CommentCard key={`${comment.id}-${index}`} comment={comment} articleId={articleId} />
        ))}
      </ul>
    </div>
  )
}
