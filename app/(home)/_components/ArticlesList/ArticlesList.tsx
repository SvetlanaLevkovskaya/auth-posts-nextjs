import { FC } from 'react'

import Link from 'next/link'

import { Button, ImageWithFallback } from '@/components/ui'

import { Article } from '@/types'


type Props = {
  articles: Article[]
}

export const ArticlesList: FC<Props> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No articles found</p>
  }

  return (
    <div className="flex flex-col justify-center w-full gap-6 px-0 tb:px-10">
      {articles.map((article) => {
        const isContentLong = article.content.length > 100
        const displayedContent = isContentLong
          ? article.content.slice(0, 100) + '...'
          : article.content

        return (
          <div
            key={article.id}
            className={'bg-gray-2 shadow-md rounded-lg text-s_body overflow-hidden p-4 min-w-72'}
          >
            <Link href={`/articles/${article.id}`} className="flex w-full flex-col tb:flex-row">
              <ImageWithFallback
                src={article.image || ''}
                alt={article.title}
                width={192}
                height={192}
              />
              <div className="flex flex-col justify-between flex-grow">
                <div className="flex flex-col justify-between">
                  <h2 className="break-all whitespace-normal">{article.title.toUpperCase()}</h2>
                  <p className="mt-2 text-gray-4 break-all whitespace-normal">{displayedContent}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button color="neon" size="m">
                    Read more
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
