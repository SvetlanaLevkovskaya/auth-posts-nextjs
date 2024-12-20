'use client'

import { KeyboardEvent, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { AppRoutes } from '@/lib/api/routes'
import { login } from '@/stores/userStore'
import { LoginFormData } from '@/types'
import { loginValidationSchema } from '@/utils'


export const LoginForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<LoginFormData> = async ({ username, password }) => {
    try {
      const response = await apiClientService.login({ username, password })
      const { access, refresh } = response

      Cookies.set('access_token', access)
      Cookies.set('refresh_token', refresh)

      login(username, password)

      customToastSuccess(`User ${username} logged in`)
      window.location.href = AppRoutes.articles
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(error.response.data?.detail)
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
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
          className="flex flex-col gap-5"
          autoComplete="off"
          noValidate
        >
          <Input
            register={register('username')}
            placeholder="Username"
            error={errors.username?.message}
            autofocus
          />

          <Input
            register={register('password')}
            placeholder="Password"
            type="password"
            error={errors.password?.message}
          />
          <Button color="neon" className="w-full" disabled={isSubmitting}>
            Login
          </Button>
        </form>
        <p className="text-black mt-4">
          Don&apos;t have an account?
          <Link href={AppRoutes.registration} className="link text-black ml-2">
            Register
          </Link>
        </p>

        <p className="text-black mt-4">
          Forgot your password?
          <Link href={AppRoutes.changePassword} className="link text-black ml-2">
            Change Password
          </Link>
        </p>
      </div>
    </div>
  )
}
