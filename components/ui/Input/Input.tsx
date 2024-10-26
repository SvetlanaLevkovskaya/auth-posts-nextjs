'use client'

import { ChangeEventHandler, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import clsx from 'clsx'

import styles from './Input.module.scss'


type InputTypeNamespace = 'text' | 'password' | 'file' | 'email'

type Props = {
  register: UseFormRegisterReturn<any>
  label?: string
  placeholder?: string
  type?: InputTypeNamespace
  error?: string | boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
  disabled?: boolean
  className?: string
  loading?: boolean
  autofocus?: boolean
  accept?: string
}

export const Input = ({
  register,
  type = 'text',
  label,
  error,
  required,
  placeholder,
  disabled,
  className,
  onChange,
  loading,
  autofocus,
  ...props
}: Props) => {
  const [currentType] = useState(type === 'text' ? 'text' : type)

  return (
    <div
      className={clsx(
        styles.wrapper,
        { [styles.errorWrapper]: error },
        { ['mb-9']: typeof error === 'string' && !!error.length },
        { [`${className}`]: className }
      )}
    >
      <label>
        {label && <span className={styles.label}>{label}</span>}
        <div>
          <input
            className={styles.input}
            type={currentType}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            autoComplete="new-password"
            {...register}
            onChange={(e) => {
              onChange?.(e)
              register?.onChange?.(e)
            }}
            {...props}
          />
          {typeof error === 'string' && !!error.length && (
            <div className={styles.error}>{error}</div>
          )}
        </div>
      </label>
    </div>
  )
}
