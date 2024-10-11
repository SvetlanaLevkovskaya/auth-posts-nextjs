'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Cookies from 'js-cookie'

import { Button, Input, customToastError, customToastSuccess } from '@/ui/index'

import styles from './LoginForm.module.scss'

import { login } from '@/stores/userStore'
import { FormData } from '@/types'
import { validationSchema } from '@/utils'


export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
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
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register('username', { required: true })}
            placeholder="test_task1"
            error={errors.username?.message}
            required
            autofocus
          />

          <Input
            register={register('password', { required: true })}
            placeholder="test_task12345"
            type="password"
            error={errors.password?.message}
            required
          />
          <Button color="neon" className={styles.btn} disabled={isSubmitting}>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
