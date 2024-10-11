'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { registrationValidationSchema } from '@/utils'


interface RegistrationFormData {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export const RegistrationForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationValidationSchema),
  })

  const onSubmit: SubmitHandler<RegistrationFormData> = async ({
    username,
    password,
    email,
    firstName,
    lastName,
  }) => {
    try {
      await axios.post('https://darkdes-django-t3b02.tw1.ru/api/v1/registration/', {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
      })
      customToastSuccess(`User ${username} registered successfully`)
      router.push('/')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.username?.[0] || 'A user with that username already exists.'
        customToastError(errorMessage)
      } else {
        customToastError('Failed to register user')
      }
    }
  }

  return (
    <div className="flex-center-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            register={register('username', { required: true })}
            placeholder="Username"
            error={errors.username?.message}
            required
          />
          <Input
            register={register('password', { required: true })}
            placeholder="Password"
            type="password"
            error={errors.password?.message}
            required
          />
          <Input
            register={register('email', { required: true })}
            placeholder="Email"
            type="email"
            error={errors.email?.message}
            required
          />
          <Input
            register={register('firstName', { required: true })}
            placeholder="First Name"
            error={errors.firstName?.message}
            required
          />
          <Input
            register={register('lastName', { required: true })}
            placeholder="Last Name"
            error={errors.lastName?.message}
            required
          />
          <Button color="neon" disabled={isSubmitting}>
            Register
          </Button>
        </form>

        <p className="text-black mt-4">
          Already have an account?
          <Link href="/login" className="link text-black ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}