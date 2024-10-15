'use client'

import React, { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, Spinner, customToastError, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { useArticles } from '@/providers/ArticlesProvider'
import { ArticleFormData } from '@/types'
import { createArticleValidationSchema } from '@/utils'


export const CreateArticleForm = () => {
  const { addArticle } = useArticles()
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: yupResolver(createArticleValidationSchema),
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }
    try {
      const newArticleData = await apiClientService.createArticle(formData)
      const allArticles = await apiClientService.getAllArticles()

      const createdArticle = allArticles.find(
        (article) =>
          article.title === newArticleData.title && article.content === newArticleData.content
      )

      if (createdArticle) {
        addArticle(createdArticle)
        customToastSuccess('Статья успешно создана и загружена!')
      } else {
        customToastError('Не удалось найти созданную статью.')
      }
      reset()
    } catch (error) {
      console.error('Ошибка при создании статьи:', error)
      customToastError('Ошибка при создании статьи.')
    }
  }

  return (
    <div className=" flex self-start  max-w-md p-8 bg-gray-2 rounded-md">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label={'Title:'}
          register={register('title')}
          placeholder="Title"
          error={errors.title?.message}
          disabled={isSubmitting}
        />

        <Input
          label={'Content:'}
          register={register('content')}
          placeholder="Content"
          error={errors.content?.message}
          disabled={isSubmitting}
        />

        <Input
          type="file"
          label={'Image (optional):'}
          register={register('image')}
          error={errors.image?.message}
          disabled={isSubmitting}
          accept="image/*"
        />

        <Button color="neon" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Create an article'}
        </Button>
      </form>
    </div>
  )
}
