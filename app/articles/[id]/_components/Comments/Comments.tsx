'use client'

import { FC, KeyboardEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { customToastSuccess } from '@/components/ui'

import { Button } from '@/ui/Button/Button'
import { Input } from '@/ui/Input/Input'

import { apiClientService } from '@/services/apiClientService'

import { CommentCard } from '@/app/articles/[id]/_components'
import { Comment, CommentFormData } from '@/types'


type Props = {
  articleId: number
  initialComments: Comment[]
}

export const Comments: FC<Props> = ({ articleId, initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    defaultValues: { content: '' },
  })

  const handleAddComment = async (data: CommentFormData) => {
    const newComment = await apiClientService.addCommentToArticle(articleId, {
      content: data.content,
    })
    setComments((prevComments) => [...prevComments, newComment])
    reset()
    customToastSuccess('Комментарий успешно добавлен!')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(handleAddComment)()
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-s_text font-bold mb-4">Comments ({comments?.length})</h2>

      <form onSubmit={handleSubmit(handleAddComment)} className="flex items-start gap-4 mb-4">
        <Input
          register={register('content', { required: 'Field is required.' })}
          placeholder="Write your comment..."
          error={errors.content?.message}
          className="bg-gray-3 text-white flex-grow rounded-md"
          onKeyDown={handleKeyDown}
        />
        <Button disabled={isSubmitting} size="m" color="neon" className="mt-2">
          Add comment
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
