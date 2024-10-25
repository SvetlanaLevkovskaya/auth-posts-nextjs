import { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { Button, TextArea } from '@/ui/index'

import { CommentFormData } from '@/types'


export const CommentReplyForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: CommentFormData) => void
  onCancel: () => void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    defaultValues: { content: '' },
  })

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <TextArea
        register={register('content')}
        onKeyDown={handleKeyDown}
        error={errors.content?.message}
      />
      <div className="flex justify-end gap-2 mt-2 mb-2">
        <Button color="neon" size="m" disabled={isSubmitting}>
          Reply
        </Button>
        <Button color="purple" size="m" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
