'use client'

import type { FC, MouseEventHandler, PropsWithChildren } from 'react'

import clsx from 'clsx'

import styles from './Button.module.scss'


type ColorType = 'neon' | 'purple' | 'white' | 'grey'

type SizeType = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'

interface ButtonProps extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ColorType
  size?: SizeType
  type?: 'square' | 'circle'
  hoverColor?: 'purple' | 'neon'
  active?: 'purple' | 'neon'
  disabled?: boolean
  className?: string
}

export const Button: FC<ButtonProps> = ({
  color = 'default',
  size = 'l',
  type,
  disabled,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles[`${color}`]]: color },
        { [styles[`${size}`]]: size && color !== 'default' },
        { [styles[`${type}`]]: type && color !== 'default' },
        { [`${className}`]: className }
      )}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
