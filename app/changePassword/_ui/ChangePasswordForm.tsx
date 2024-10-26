'use client'

import { KeyboardEvent, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Link from 'next/link'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { AppRoutes } from '@/lib/api/routes'
import { ChangePasswordFormData } from '@/types'
import { changePasswordValidationSchema } from '@/utils'


export const ChangePasswordForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordValidationSchema),
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    try {
      const response = await apiClientService.changePassword({
        old_password: data.old_password,
        password: data.password,
        confirmed_password: data.confirmed_password,
      })

      if (response.success) {
        customToastSuccess('Password changed successfully')
        window.location.href = AppRoutes.login
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(
            error.response.data?.old_password?.[0] ||
              error.response.data?.password?.[0] ||
              error.response.data?.detail
          )
        }
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form
          ref={formRef}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <Input
            register={register('old_password')}
            placeholder="Old password"
            type="password"
            error={errors.old_password?.message}
            autofocus
          />
          <Input
            register={register('password')}
            placeholder="New password"
            type="password"
            error={errors.password?.message}
          />
          <Input
            register={register('confirmed_password')}
            placeholder="Confirm new password"
            type="password"
            error={errors.confirmed_password?.message}
          />
          <Button color="neon" className="w-full" disabled={isSubmitting}>
            Change Password
          </Button>
        </form>
        <p className="text-black mt-4">
          <Link href={AppRoutes.login} className="link text-black ml-2">
            Go back
          </Link>
        </p>
      </div>
    </div>
  )
}
