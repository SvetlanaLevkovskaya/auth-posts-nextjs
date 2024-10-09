'use client'

import { FC } from 'react'

import styles from './CommentContent.module.scss'


type CommentContentProps = {
  body: string
  email: string
}

export const CommentContent: FC<CommentContentProps> = ({ body, email }) => {
  return (
    <div className={styles.commentContent}>
      <p>{body}</p>
      <small>{email}</small>
    </div>
  )
}
