'use client'

import { ArticlesList, CreateArticleForm } from '@/app/(home)/_components'
import { Article } from '@/types'
import { token } from '@/app/constants'


export const Articles = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="px-0 tb:px-8">Articles</h1>
      <ArticlesList articles={articles} />

      <CreateArticleForm token={token}/>
    </div>
  )
}
