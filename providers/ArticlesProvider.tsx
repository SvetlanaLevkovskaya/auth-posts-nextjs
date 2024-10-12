'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

import { Article } from '@/types'


type ArticlesContextType = {
  articles: Article[]
  setArticles: (articles: Article[]) => void
  addArticle: (newArticle: Article) => void
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined)

export const ArticlesProvider = ({
  children,
  initialArticles,
}: {
  children: ReactNode
  initialArticles: Article[]
}) => {
  const [articles, setArticles] = useState<Article[]>(initialArticles)

  const addArticle = (newArticle: Article) => {
    setArticles((prevArticles) => [newArticle, ...prevArticles])
  }

  return (
    <ArticlesContext.Provider value={{ articles, setArticles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => {
  const context = useContext(ArticlesContext)
  if (!context) throw new Error('useArticles must be used within an ArticlesProvider')
  return context
}
