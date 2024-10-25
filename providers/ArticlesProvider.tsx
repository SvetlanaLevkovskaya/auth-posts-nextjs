'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

import { customToastError, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/apiClientService'

import { Article } from '@/types'


type ArticlesContextType = {
  articles: Article[]
  setArticles: (articles: Article[]) => void
  addArticle: (newArticle: Article) => void
  deleteArticle: (articleId: number) => Promise<void>
  deletingArticleId: number | null
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
  const [deletingArticleId, setDeletingArticleId] = useState<number | null>(null)

  const addArticle = (newArticle: Article) => {
    setArticles((prevArticles) => [newArticle, ...prevArticles])
  }

  const deleteArticle = async (articleId: number) => {
    setDeletingArticleId(articleId)
    try {
      await apiClientService.deleteArticle(articleId)
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId)
      )
      customToastSuccess('Статья успешно удалена!')
    } catch (error) {
      customToastError('Ошибка при удалении статьи')
    } finally {
      setDeletingArticleId(null)
    }
  }


  return (
    <ArticlesContext.Provider  value={{ articles, setArticles, addArticle, deleteArticle, deletingArticleId  }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => {
  const context = useContext(ArticlesContext)
  if (!context) throw new Error('useArticles must be used within an ArticlesProvider')
  return context
}
