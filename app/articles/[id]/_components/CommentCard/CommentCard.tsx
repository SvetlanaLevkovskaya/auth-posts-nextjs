'use client'

import React, { FC } from 'react'

import styles from './CommentCard.module.scss'

import { CommentContent, CommentIcons, LikeButton } from '@/app/articles/[id]/_components'
import { Comment } from '@/types'


type CommentCardProps = {
  comment: Comment
}

export const CommentCard: FC<CommentCardProps> = ({ comment }) => {
  console.log('comment', comment)
  return (
    <li className={styles.commentCard}>
      <div className={styles.likeButtonWrapper}>
        <LikeButton commentId={comment.id} />
      </div>
      <CommentContent body={comment.content} email={comment.author.username} />
      <CommentIcons commentId={comment.id} />
    </li>
  )
}
