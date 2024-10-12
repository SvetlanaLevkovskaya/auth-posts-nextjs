'use client'

import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Input, Spinner, TextArea, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/clientApi'

import { useArticle } from '@/providers/ArticleProvider'
import { ArticleFormData } from '@/types'
import { editArticleValidationSchema } from '@/utils'


export const EditArticleForm = () => {
  const { article, setArticle } = useArticle()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: yupResolver(editArticleValidationSchema),
  })

  useEffect(() => {
    if (article) {
      setValue('title', article.title)
      setValue('content', article.content)
    }
  }, [article, setValue])

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    if (!article) return

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)

    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0])
    }
    await apiClientService.updateArticle(article.id, formData)
    const updatedArticle = await apiClientService.getAllArticleById(article.id)
    setArticle(updatedArticle)
    customToastSuccess(`Статья успешно обновлена!`)
  }

  return (
    <div className="flex justify-end mx-9 self-start">
      <div className="w-full max-w-md p-8 bg-gray-2 rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label={'Title:'}
            register={register('title')}
            placeholder="Title"
            error={errors.title?.message}
            disabled={isSubmitting}
          />

          <TextArea
            label={'Content:'}
            register={register('content')}
            placeholder="Content"
            error={errors.content?.message}
          />

          <Input
            type="file"
            label={'Image (optional):'}
            register={register('image')}
            placeholder="Image"
            error={errors.image?.message}
            disabled={isSubmitting}
            accept="image/*"
          />

          <Button color="neon" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Update article'}
          </Button>
        </form>
      </div>
    </div>
  )
}
