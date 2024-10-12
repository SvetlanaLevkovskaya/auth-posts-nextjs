'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

import { Article } from '@/types'


type ArticleContextType = {
  article: Article | null
  setArticle: (article: Article) => void
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export const ArticleProvider = ({
  children,
  initialArticle,
}: {
  children: ReactNode
  initialArticle: Article
}) => {
  const [article, setArticle] = useState<Article | null>(initialArticle)

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>{children}</ArticleContext.Provider>
  )
}

export const useArticle = () => {
  const context = useContext(ArticleContext)
  if (!context) throw new Error('useArticle must be used within an ArticleProvider')
  return context
}
