'use client'

import { FC } from 'react'
import { FaHeart } from 'react-icons/fa'

import { useStore } from '@nanostores/react'
import clsx from 'clsx'

import styles from './LikeButton.module.scss'

import { handleHeartClick, heardState } from '@/stores/heardStore'


type LikeButtonProps = {
  commentId: number
}

export const LikeButton: FC<LikeButtonProps> = ({ commentId }) => {
  const state = useStore(heardState)

  const isLiked = state.heartLiked[commentId]

  return (
    <FaHeart
      className={clsx(styles.icon, { [styles.liked]: isLiked })}
      onClick={() => handleHeartClick(commentId)}
    />
  )
}
