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
  loading,
  autofocus,
  ...props
}) => {
  const [currentType] = useState(type === 'text' ? 'text' : type)

  return (
    <div
      className={clsx(
        styles.input,
        { [styles.error]: typeof error !== 'undefined' },
        { ['mb-9']: typeof error === 'string' && !!error.length },
        { [`${className}`]: className }
      )}
    >
      <label>
        {label && <span className={styles.label}>{label}</span>}

        <div className={styles.wrapper}>
          <input
            type={currentType}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            {...register}
            onChange={(e) => {
              onChangeInput?.(e)
              register?.onChange?.(e)
            }}
            {...props}
          />
        </div>

        {typeof error === 'string' && !!error.length && <div className={styles.error}>{error}</div>}
      </label>
    </div>
  )
}
