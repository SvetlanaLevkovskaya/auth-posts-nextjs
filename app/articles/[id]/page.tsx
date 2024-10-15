import type { Metadata } from 'next'

import { NavLayout } from '@/components/Layouts/NavLayout'

import { apiClientService } from '@/services/apiClientService'

import { ArticleDetails } from '@/app/articles/[id]/_components'
import { ArticleProvider } from '@/providers/ArticleProvider'
import { CommentsProvider } from '@/providers/CommentsProvider'
import { Params } from '@/types'


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: `Article ${params.id}` }
}

export default async function ArticlePage({ params }: Params) {
  const { id } = params

  const article = await apiClientService.getAllArticleById(id)
  const comments = await apiClientService.getCommentsByArticleId(id)

  return (
    <NavLayout>
      <ArticleProvider initialArticle={article}>
        <CommentsProvider initialComments={comments}>
          <ArticleDetails />
        </CommentsProvider>
      </ArticleProvider>
    </NavLayout>
  )
}
