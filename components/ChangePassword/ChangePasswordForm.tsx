'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import { Button, Input, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/apiClientService'

import { ChangePasswordFormData } from '@/types'
import { changePasswordValidationSchema } from '@/utils'


export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordValidationSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    const response = await apiClientService.changePassword({
      old_password: data.old_password,
      password: data.password,
      confirmed_password: data.confirmed_password,
    })

    if (response.Success) {
      customToastSuccess('Password changed successfully')
      window.location.href = '/login'
    }
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
          <Link href="/login" className="link text-black ml-2">
            Go back
          </Link>
        </p>
      </div>
    </div>
  )
}
