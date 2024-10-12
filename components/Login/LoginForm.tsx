'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import Cookies from 'js-cookie'
import Link from 'next/link'

import { Button, Input, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/clientApi'

import { login } from '@/stores/userStore'
import { FormData } from '@/types'
import { loginValidationSchema } from '@/utils'


export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  })

  const onSubmit: SubmitHandler<FormData> = async ({ username, password }) => {
    const response = await apiClientService.login({ username, password })
    const { access, refresh } = response

    Cookies.set('access_token', access)
    Cookies.set('refresh_token', refresh)

    login(username, password)

    customToastSuccess(`User ${username} logged in`)
    window.location.href = '/'
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form
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
