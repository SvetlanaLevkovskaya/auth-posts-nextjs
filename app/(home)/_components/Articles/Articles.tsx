'use client'

import { ArticlesList, CreateArticleForm } from '@/app/(home)/_components'


export const Articles = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="px-0 tb:px-8">Articles</h1>
      <ArticlesList />
      <CreateArticleForm />
    </div>
  )
}
