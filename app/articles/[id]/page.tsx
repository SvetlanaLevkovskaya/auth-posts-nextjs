import type { Metadata } from 'next'

import { NavLayout } from '@/components/Layouts/NavLayout'

import { ArticleDetails, EditArticleForm } from '@/app/articles/[id]/_components'
import { apiClientService } from '@/app/services/clientApi'
import { Params } from '@/types'
import { token } from '@/app/constants'


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: `Article ${params.id}` }
}

export default async function ArticlePage({ params }: Params) {
  const { id } = params

  const article = await apiClientService.getAllArticleById(token, id)
  const comments = await apiClientService.getCommentsByArticleId(token, id)

  return (
    <NavLayout isAuth={true}>
      <ArticleDetails article={article.data} comments={comments.data} />
      <EditArticleForm article={article.data} token={token} />
    </NavLayout>
  )
}
