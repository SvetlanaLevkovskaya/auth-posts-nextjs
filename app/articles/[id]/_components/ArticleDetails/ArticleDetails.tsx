'use client'

import { FC } from 'react'

import { ImageWithFallback } from '@/components/ui'

import { Comments, EditArticleForm } from '@/app/articles/[id]/_components'
import { useArticle } from '@/providers/ArticleProvider'
import { Comment } from '@/types'
import { hasLongWord } from '@/utils'


type Props = {
  comments: Comment[]
  currentUser?: string
}

export const ArticleDetails: FC<Props> = ({ comments, currentUser }) => {
  const { article } = useArticle()

  if (!article) return null
  const shouldBreakAll = hasLongWord(article.content)
  const isAuthor = article.author.username === currentUser

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{article.title.toUpperCase()}</h1>
          <ImageWithFallback src={article.image} alt={article.title} width={192} height={192} />
          <p
            className={`my-4 text-lg leading-relaxed  ${shouldBreakAll ? 'break-all' : 'break-words'}`}
          >
            {article.content}
          </p>
          <p className="text-sm text-gray-4">Author: {article?.author?.username}</p>
        </div>

        <div className="container mx-auto p-4 mt-8 bg-gray-1 rounded-lg shadow-md">
          <Comments initialComments={comments} articleId={article.id} currentUser={currentUser}/>
        </div>
      </div>

      {isAuthor && <EditArticleForm />}
    </>
  )
}
