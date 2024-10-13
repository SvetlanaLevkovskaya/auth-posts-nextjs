'use client'

import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { login } from '@/stores/userStore'
import { FormData } from '@/types'
import { loginValidationSchema } from '@/utils'


export const LoginForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<FormData> = async ({ username, password }) => {
    try {
      const response = await apiClientService.login({ username, password })
      const { access, refresh } = response

      Cookies.set('access_token', access)
      Cookies.set('refresh_token', refresh)

      login(username, password)

      customToastSuccess(`User ${username} logged in`)
      window.location.href = '/'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(error.response.data?.detail)
        }
      }
    }
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
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
          <Link href="/registration" className="link text-black ml-2">
            Register
          </Link>
        </p>

        <p className="text-black mt-4">
          Forgot your password?
          <Link href="/changePassword" className="link text-black ml-2">
            Change Password
          </Link>
        </p>
      </div>
    </div>
  )
}
