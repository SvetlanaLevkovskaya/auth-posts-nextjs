import { FC, KeyboardEvent, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button, TextArea } from '@/ui/index'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { CommentFormData } from '@/types'


type Props = {
  initialContent: string
  onSubmit: (data: CommentFormData) => void
  onCancel: () => void
}

export const CommentEditForm: FC<Props> = ({ initialContent, onSubmit, onCancel }) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    defaultValues: { content: initialContent },
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        register={register('content')}
        onKeyDown={handleKeyDown}
        error={errors.content?.message}
      />
      <div className="flex justify-end gap-2 mt-2 mb-2">
        <Button color="neon" size="m" disabled={isSubmitting}>
          Save
        </Button>
        <Button color="purple" size="m" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
