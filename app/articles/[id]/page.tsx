import type { Metadata } from 'next'

import { NavLayout } from '@/components/Layouts/NavLayout'

import { ArticleDetails, EditArticleForm } from '@/app/articles/[id]/_components'
import { getAuth } from '@/app/providers/getAuth'
import { apiClientService } from '@/app/services/clientApi'
import { Params } from '@/types'


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: `Article ${params.id}` }
}

export default async function ArticlePage({ params }: Params) {
  const { id } = params
  const { isAuth } = getAuth()

  const article = await apiClientService.getAllArticleById(id)
  const comments = await apiClientService.getCommentsByArticleId(id)

  return (
    <NavLayout isAuth={isAuth}>
      <ArticleDetails article={article} comments={comments} />
      <EditArticleForm article={article} />
    </NavLayout>
  )
}
