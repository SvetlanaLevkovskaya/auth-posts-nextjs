'use client'

import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { XMarkIcon } from '@heroicons/react/16/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Image from 'next/image'

import {
  Button,
  Input,
  Spinner,
  TextArea,
  customToastError,
  customToastSuccess,
} from '@/components/ui'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { useArticle } from '@/providers/ArticleProvider'
import { ArticleFormData } from '@/types'
import { editArticleValidationSchema } from '@/utils'


export const EditArticleForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { article, setArticle } = useArticle()
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({ resolver: yupResolver(editArticleValidationSchema) })

  const { field } = useController({ name: 'image', control })

  useEffect(() => {
    if (article) {
      setValue('title', article.title)
      setValue('content', article.content)
      if (article.image) {
        setPreviewImage(article.image)
      }
    }
  }, [article, setValue])

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<ArticleFormData> = async (data) => {
    try {
      if (!article) return

      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)

      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0])
      } else if (!previewImage) {
        formData.append('image', '')
      }
      await apiClientService.updateArticle(article.id, formData)
      const updatedArticle = await apiClientService.getAllArticleById(article.id)
      setArticle(updatedArticle)
      customToastSuccess(`Статья успешно обновлена!`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(error.response.data?.detail)
        }
      }
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    field.onChange(null)
  }

  return (
    <div className="flex justify-end mx-9 self-start">
      <div className="w-full max-w-md p-8 bg-gray-2 rounded-md">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

          <div className="flex justify-center gap-2">
            <Input
              register={register('image')}
              type="file"
              label={'Image (optional):'}
              placeholder="Image"
              error={errors.image?.message}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  field.onChange(file)
                  setPreviewImage(URL.createObjectURL(file))
                }
              }}
            />
            {previewImage && (
              <div className="relative">
                <Image
                  src={previewImage}
                  alt="image preview"
                  width={96}
                  height={96}
                  className="max-w-24 max-h-24 object-cover rounded-md self-end"
                />
                <Button
                  onClick={handleDeleteImage}
                  color="white"
                  size="xs"
                  className="absolute top-0 right-0"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-2" />
                </Button>
              </div>
            )}
          </div>

          <Button color="neon" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Update article'}
          </Button>
        </form>
      </div>
    </div>
  )
}
