import { NavLayout } from '@/components/Layouts/NavLayout'

import { apiClientService } from '@/services/clientApi'

import { Articles } from '@/app/(home)/_components'
import { ArticlesProvider } from '@/providers/ArticlesProvider'


export default async function ArticlesPage() {
  const articles = await apiClientService.getAllArticles()

  return (
    <NavLayout>
      <ArticlesProvider initialArticles={articles}>
        <Articles />
      </ArticlesProvider>
    </NavLayout>
  )
}
