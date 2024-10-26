'use client'

import type { MouseEventHandler, PropsWithChildren } from 'react'

import clsx from 'clsx'

import styles from './Button.module.scss'


type ColorType = 'neon' | 'purple' | 'white' | 'grey' | 'default'

type SizeType = 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs'

interface Props extends PropsWithChildren {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ColorType
  size?: SizeType
  type?: 'square' | 'circle'
  hoverColor?: ColorType
  active?: ColorType
  disabled?: boolean
  className?: string
}

export const Button = ({
  color = 'default',
  size = 'l',
  type,
  disabled,
  onClick,
  className,
  children,
}: Props) => {
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
