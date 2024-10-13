'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, Spinner, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/apiClientService'

import { useArticles } from '@/providers/ArticlesProvider'
import { ArticleFormData } from '@/types'
import { createArticleValidationSchema } from '@/utils'


export const CreateArticleForm = () => {
  const { addArticle } = useArticles()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: yupResolver(createArticleValidationSchema),
  })

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }
    const newArticle = await apiClientService.createArticle(formData)

    addArticle(newArticle)
    reset()
    customToastSuccess(`Статья успешно создана!`)
  }

  return (
    <div className=" flex self-start  max-w-md p-8 bg-gray-2 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
