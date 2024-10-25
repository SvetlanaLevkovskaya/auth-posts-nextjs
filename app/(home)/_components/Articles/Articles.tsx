'use client'

import { useStore } from '@nanostores/react'
import Link from 'next/link'

import { Button, ImageWithFallback } from '@/components/ui'

import { CreateArticleForm } from '@/app/(home)/_components'
import { useArticles } from '@/providers/ArticlesProvider'
import { userStore } from '@/stores/userStore'


export const Articles = () => {
  const { articles, deleteArticle, deletingArticleId} = useArticles()
  const { username } = useStore(userStore)

  if (!articles.length) return null
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="px-0 tb:px-8">Articles</h1>
      <div className="flex gap-6">
        <div className="flex flex-col justify-center w-full gap-6 px-0 tb:px-10">
          {articles &&
            articles.map((article, index) => {
              const isAuthor = article?.author?.username === username
              const isContentLong = article?.content?.length > 100
              const displayedContent = isContentLong
                ? article.content.slice(0, 100) + '...'
                : article.content

              return (
                <div
                  key={`${article.id}-${index}`}
                  className={
                    'bg-gray-2 shadow-md rounded-lg text-s_body overflow-hidden p-4 min-w-72'
                  }
                >
                  <Link
                    href={`/articles/${article.id}`}
                    className="flex w-full flex-col tb:flex-row"
                  >
                    <ImageWithFallback
                      src={article.image || ''}
                      alt={article.title}
                      width={192}
                      height={192}
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div className="flex flex-col justify-between">
                        <h2 className="break-words whitespace-normal">
                          {article?.title?.toUpperCase()}
                        </h2>
                        <p className="mt-2 text-gray-4 break-all whitespace-normal">
                          {displayedContent}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button color="neon" size="m">
                          Read more
                        </Button>
                      </div>
                    </div>
                  </Link>

                  {isAuthor && (
                    <div className="mt-4 flex justify-end">
                      <Button
                        color="purple"
                        size="m"
                        disabled={deletingArticleId === article.id}
                        onClick={() => deleteArticle(article.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
        </div>

        <CreateArticleForm />
      </div>
    </div>
  )
}
