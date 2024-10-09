import { ChangeEventHandler } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputTypeNamespace = 'text' | 'password' | 'file'

export interface InputProps {
  register: any
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
