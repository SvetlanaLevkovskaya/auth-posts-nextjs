'use client'

import { ImageWithFallback } from '@/ui/ImageWithFallback/ImageWithFallback'

import { Comments } from '@/app/articles/[id]/_components'
import { Article, Comment } from '@/types'


export const ArticleDetails = ({ article, comments }: { article: Article; comments: Comment[] }) => {
  if (!article) return null

  return (
    <div className='flex flex-col gap-6 w-full'>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{article.title.toUpperCase()}</h1>
        <ImageWithFallback
          src={article.image || ''}
          alt={article.title}
          width={192}
          height={192}
        />
        <p className="my-4 text-lg leading-relaxed break-all whitespace-normal">{article.content}</p>
        <p className="text-sm text-gray-4">Автор: {article.author.username}</p>
      </div>

      <div className="container mx-auto p-4 mt-8 bg-gray-1 rounded-lg shadow-md">
        <Comments initialComments={comments} articleId={article.id}/>
      </div>
    </div>
  )
}
