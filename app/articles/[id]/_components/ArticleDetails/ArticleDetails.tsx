'use client'

import { useStore } from '@nanostores/react'

import { ImageWithFallback } from '@/components/ui'

import { Comments, EditArticleForm } from '@/app/articles/[id]/_components'
import { useArticle } from '@/providers/ArticleProvider'
import { userStore } from '@/stores/userStore'
import { hasLongWord } from '@/utils'


export const ArticleDetails = () => {
  const { article } = useArticle()

  const { username } = useStore(userStore)

  if (!article) return null

  const shouldBreakAll = hasLongWord(article.content)
  const isAuthor = article.author.username === username

  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{article.title.toUpperCase()}</h1>
          <div className="min-w-46 min-h-46">
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              width={240}
              height={240}
              className="object-cover rounded-md mr-4 w-60 h-60"
            />
          </div>
          <p
            className={`my-4 text-lg leading-relaxed  ${shouldBreakAll ? 'break-all' : 'break-words'}`}
          >
            {article.content}
          </p>
          <p className="text-sm text-gray-4">Author: {article?.author?.username}</p>
        </div>

        <div className="container mx-auto p-4 mt-8 bg-gray-1 rounded-lg shadow-md">
          <Comments articleId={article.id} />
        </div>
      </div>

      {isAuthor && <EditArticleForm />}
    </>
  )
}
