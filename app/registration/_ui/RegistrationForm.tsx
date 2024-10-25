'use client'

import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import { apiClientService } from '@/services/apiClientService'

import { useClearErrorsOnOutsideClick } from '@/hooks'
import { AppRoutes } from '@/lib/api/routes'
import { login } from '@/stores/userStore'
import { RegistrationFormData } from '@/types'
import { registrationValidationSchema } from '@/utils'


export const RegistrationForm = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationValidationSchema),
  })

  useClearErrorsOnOutsideClick(formRef, clearErrors)

  const onSubmit: SubmitHandler<RegistrationFormData> = async (formData) => {
    try {
      await apiClientService.registration({
        ...formData,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })

      login(formData.username, formData.password)

      customToastSuccess(`User ${formData.username} registered successfully`)
      router.push(AppRoutes.articles)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(error.response.data?.username?.[0])
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
          <Link href={AppRoutes.login} className="link text-black ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
