'use client'

import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, Spinner } from '@/components/ui'

import { customToastError, customToastSuccess } from '@/ui/CustomToast/CustomToast'
import { TextArea } from '@/ui/TextArea/TextArea'

import { editArticleValidationSchema } from '@/utils/editArticleValidationSchema'

import { apiClientService } from '@/app/services/clientApi'
import { Article, EditArticleFormData } from '@/types'


type Props = {
  article: Article
  token: string
}

export const EditArticleForm: FC<Props> = ({ article, token }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditArticleFormData>({
    resolver: yupResolver(editArticleValidationSchema),
  })

  useEffect(() => {
    setValue('title', article.title)
    setValue('content', article.content)
  }, [article, setValue])

  const onSubmit: SubmitHandler<EditArticleFormData> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }

    try {
      await apiClientService.updateArticle(article.id, formData, token)
      customToastSuccess(`Статья успешно обновлена!`)
    } catch (error) {
      console.error('Ошибка при обновлении статьи:', error)
      customToastError('Ошибка при обновлении статьи')
    }
  }

  return (
    <div className="flex justify-end mx-9 self-start">
      <div className="w-full max-w-md p-8 bg-gray-2 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label={'Заголовок:'}
            register={register('title')}
            placeholder="Заголовок"
            error={errors.title?.message}
            disabled={isSubmitting}
          />

          <TextArea
            label={'Описание:'}
            register={register('content')}
            placeholder="Описание"
            error={errors.content?.message}
          />

          <Input
            type="file"
            label={'Изображение (необязательно):'}
            register={register('image')}
            placeholder="Изображение"
            error={errors.image?.message}
            disabled={isSubmitting}
            accept="image/*"
          />

          <Button color="neon" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Обновить статью'}
          </Button>
        </form>
      </div>
    </div>
  )
}
