'use client'

import { FC } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

import { useStore } from '@nanostores/react'
import clsx from 'clsx'

import { Button } from '@/components/ui'

import styles from './CommentIcons.module.scss'

import { handleDislikeClick, handleLikeClick, likeState } from '@/stores/likeStore'


type CommentIconsProps = {
  commentId: number
}

export const CommentIcons: FC<CommentIconsProps> = ({ commentId }) => {
  const state = useStore(likeState)
  const isLiked = state.likes[commentId]
  const isDisliked = state.dislikes[commentId]

  return (
    <div className={styles.icons}>
      <div className={styles.iconWrapper}>
        <Button size="xs" color="white" onClick={() => handleLikeClick(commentId)}>
          {isLiked ? (
            <FaThumbsUp className={clsx(styles.icon)} size="16" />
          ) : (
            <FaRegThumbsUp className={styles.icon} size="16" />
          )}
        </Button>
        <span className={styles.count}>{state.likes[commentId] || null}</span>
      </div>

      <div className={styles.iconWrapper}>
        <Button size="xs" color="white" onClick={() => handleDislikeClick(commentId)}>
          {isDisliked ? (
            <FaThumbsDown className={clsx(styles.icon)} size="16" />
          ) : (
            <FaRegThumbsDown className={styles.icon} size="16" />
          )}
        </Button>
        <span className={styles.count}>{state.dislikes[commentId] || null}</span>
      </div>
    </div>
  )
}
