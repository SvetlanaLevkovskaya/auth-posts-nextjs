import { ChangeEventHandler } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import clsx from 'clsx'

import styles from './TextArea.module.scss'


type Props =  {
  register: UseFormRegisterReturn<any>
  placeholder?: string
  error?: string | boolean
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  required?: boolean
  className?: string
  label?: string
}

export const TextArea = ({
  error,
  register,
  className,
  label,
  onChange: onChangeTextArea,
  ...props
}: Props) => {

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
          <textarea
            className={styles.textarea}
            {...register}
            onChange={(e) => {
              onChangeTextArea?.(e)
              register?.onChange(e)
            }}
            name={register?.name}
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
