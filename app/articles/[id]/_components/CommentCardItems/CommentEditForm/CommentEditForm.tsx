import { FC, KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { TextArea } from '@/ui/TextArea/TextArea'
import { Button } from '@/ui/index'

import { CommentFormValues } from '@/types'


type Props = {
  initialContent: string
  onSubmit: (data: CommentFormValues) => void
  onCancel: () => void
}

export const CommentEditForm: FC<Props> = ({ initialContent, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormValues>({
    defaultValues: { content: initialContent },
  })

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        register={register('content')}
        onKeyDown={handleKeyDown}
        error={errors.content?.message}
      />
      <div className="flex justify-end gap-2 mt-2 mb-2">
        <Button color="neon" size="m">
          Сохранить
        </Button>
        <Button color="purple" size="m" onClick={onCancel}>
          Отменить
        </Button>
      </div>
    </form>
  )
}
