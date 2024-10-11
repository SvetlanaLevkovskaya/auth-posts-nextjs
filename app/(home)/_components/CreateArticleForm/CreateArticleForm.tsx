'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, Spinner, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/app/services/clientApi'
import { createArticleValidationSchema } from '@/utils'


interface CreateArticleFormData {
  title: string
  content: string
  image?: FileList | null
}

export const CreateArticleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleFormData>({
    resolver: yupResolver(createArticleValidationSchema),
  })

  const onSubmit: SubmitHandler<CreateArticleFormData> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }
    await apiClientService.createArticle(formData)
    customToastSuccess(`Статья успешно создана!`)
  }

  return (
    <div className="flex justify-end mx-9">
      <div className="w-full max-w-md p-8 bg-gray-2 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label={'Заголовок:'}
            register={register('title')}
            placeholder="Заголовок"
            error={errors.title?.message}
            disabled={isSubmitting}
          />

          <Input
            label={'Содержание:'}
            register={register('content')}
            placeholder="Содержание"
            error={errors.content?.message}
            disabled={isSubmitting}
          />

          <Input
            type="file"
            label={'Изображение (необязательно):'}
            register={register('image')}
            error={errors.image?.message}
            disabled={isSubmitting}
            accept="image/*"
          />

          <Button color="neon" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Создать статью'}
          </Button>
        </form>
      </div>
    </div>
  )
}
