'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

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
    if (username === 'admin' && password === 'admin') {
      login(username, password)
      customToastSuccess(`User ${username} logged in`)
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } else {
      customToastError('Please enter admin/admin')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register('username', { required: true })}
            placeholder="admin"
            error={errors.username?.message}
            required
            autofocus
          />

          <Input
            register={register('password', { required: true })}
            placeholder="admin"
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
