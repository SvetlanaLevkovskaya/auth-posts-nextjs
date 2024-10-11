'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/app/services/clientApi'
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
    try {
      const response = await apiClientService.changePassword({
        old_password: data.old_password,
        password: data.password,
        confirmed_password: data.confirmed_password,
      })

      if (response.Success) {
        customToastSuccess('Password changed successfully')
        window.location.href = '/login'
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data
        if (errorData.old_password) {
          customToastError('Wrong old password.')
        } else if (errorData.password) {
          customToastError('Passwords must be confirmed correctly.')
        } else {
          customToastError('Failed to change password.')
        }
      } else {
        customToastError('Failed to change password.')
      }
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
      </div>
    </div>
  )
}