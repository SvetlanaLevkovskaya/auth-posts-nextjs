import { ChangeEventHandler, KeyboardEventHandler } from 'react'


type InputTypeNamespace = 'text' | 'password' | 'file'

export interface InputProps {
  register: any
  label?: string
  placeholder?: string
  type?: InputTypeNamespace
  error?: string | boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  required?: boolean
  disabled?: boolean
  className?: string
  loading?: boolean
  autofocus?: boolean
  accept?: string
}
