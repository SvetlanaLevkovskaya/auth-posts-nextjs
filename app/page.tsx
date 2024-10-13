import { NavLayout } from '@/components/Layouts/NavLayout'

import { apiClientService } from '@/services/apiClientService'

import { Articles } from '@/app/(home)/_components'
import { ArticlesProvider } from '@/providers/ArticlesProvider'
import { getAuth } from '@/providers/getAuth'


export default async function ArticlesPage() {
  const { isAuth } = getAuth()
  if (!isAuth) return null

  const articles = await apiClientService.getAllArticles()

  return (
    <NavLayout>
      <ArticlesProvider initialArticles={articles}>
        <Articles />
      </ArticlesProvider>
    </NavLayout>
  )
}
