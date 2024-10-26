'use client'

import { KeyboardEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'

import axios from 'axios'

import { customToastError, customToastSuccess } from '@/components/ui'

import { Button } from '@/ui/Button/Button'
import { Input } from '@/ui/Input/Input'

import { apiClientService } from '@/services/apiClientService'

import { CommentCard } from '@/app/articles/[id]/_components'
import { useClearErrorsOnOutsideClick } from '@/hooks'
import { useComments } from '@/providers/CommentsProvider'
import { CommentFormData } from '@/types'


export const Comments = ({ articleId }: { articleId: number }) => {
  const { comments, setComments } = useComments()
  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    defaultValues: { content: '' },
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const handleAddComment = async (data: CommentFormData) => {
    try {
      await apiClientService.addCommentToArticle(articleId, {
        content: data.content,
        parent: data.parent || null,
      })

      const updatedComments = await apiClientService.getCommentsByArticleId(articleId)

      setComments(updatedComments)
      reset()
      customToastSuccess('Комментарий успешно добавлен!')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        customToastError(error.response.data?.detail ||  error.response.data.content[0])
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(handleAddComment)()
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-s_text font-bold mb-4">Comments ({comments?.length})</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit(handleAddComment)}
        onKeyDown={handleKeyDown}
        className="flex items-start gap-4 mb-4"
      >
        <Input
          register={register('content', { required: 'Field is required.' })}
          placeholder="Write your comment..."
          error={errors.content?.message}
          className="bg-gray-3 text-white flex-grow rounded-md"
        />
        <Button disabled={isSubmitting} size="m" color="neon" className="mt-2">
          Add comment
        </Button>
      </form>

      <hr className="bg-gray-3 my-4" />

      <ul className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} articleId={articleId} />
        ))}
      </ul>
    </div>
  )
}
