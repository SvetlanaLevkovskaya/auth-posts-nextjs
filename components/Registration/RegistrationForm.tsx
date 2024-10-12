'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, Input, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/clientApi'

import { login } from '@/stores/userStore'
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
    await apiClientService.registration({
      username,
      password,
      email,
      first_name: firstName,
      last_name: lastName,
    })

    login(username, password)

    customToastSuccess(`User ${username} registered successfully`)
    router.push('/')
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
          <Input
            register={register('email')}
            placeholder="Email"
            type="email"
            error={errors.email?.message}
          />
          <Input
            register={register('firstName')}
            placeholder="First Name"
            error={errors.firstName?.message}
          />
          <Input
            register={register('lastName')}
            placeholder="Last Name"
            error={errors.lastName?.message}
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
