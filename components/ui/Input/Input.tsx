'use client'

import { type FC, useState } from 'react'

import clsx from 'clsx'

import styles from './Input.module.scss'

import { InputProps } from './Input.types'


export const Input: FC<InputProps> = ({
  register,
  type = 'text',
  label,
  error,

  required,
  placeholder,
  disabled,
  className,

  onChange: onChangeInput,
  onKeyDown: onKeyDownInput,
  loading,
  autofocus,
  ...props
}) => {
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
              onChangeInput?.(e)
              register?.onChange?.(e)
            }}
            onKeyDown={(e) => {
              onKeyDownInput?.(e)
              register?.onChange(e)
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
