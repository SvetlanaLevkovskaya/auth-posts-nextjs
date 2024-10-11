import { FC, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { Button, TextArea } from '@/ui/index'

import { CommentFormValues } from '@/types'


type Props = {
  onSubmit: (data: CommentFormValues) => void
  onCancel: () => void
}

export const CommentReplyForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValues>({
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
        <Button color="neon" size="m">
          Ответить
        </Button>
        <Button color="purple" size="m" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  )
}
