'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

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
    try {
      const response = await axios.post('https://darkdes-django-t3b02.tw1.ru/api/v1/token/', {
        username,
        password,
      })
      const { access, refresh } = response.data

      Cookies.set('access_token', access)
      Cookies.set('refresh_token', refresh)

      login(username, password)

      customToastSuccess(`User ${username} logged in`)
      window.location.href = '/'
    } catch (error) {
      customToastError('No active account found with the given credentials')
    }
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-5">
          <Input
            register={ register('username', { required: true }) }
            placeholder="username"
            error={ errors.username?.message }
            required
            autofocus
          />

          <Input
            register={ register('password', { required: true }) }
            placeholder="password"
            type="password"
            error={ errors.password?.message }
            required
          />
          <Button color="neon" className="w-full" disabled={ isSubmitting }>
            Login
          </Button>
        </form>
        <p className='text-black mt-4'>
          Don't have an account?
          <Link href="/registration" className="link text-black ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
