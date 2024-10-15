'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

import { Comment } from '@/types'


type CommentContextType = {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export const CommentsProvider = ({
  children,
  initialComments,
}: {
  children: ReactNode
  initialComments: Comment[]
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  return (
    <CommentContext.Provider value={{ comments, setComments }}>{children}</CommentContext.Provider>
  )
}

export const useComments = () => {
  const context = useContext(CommentContext)
  if (!context) throw new Error('useComments must be used within a CommentProvider')
  return context
}
