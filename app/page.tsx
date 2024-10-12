import { NavLayout } from '@/components/Layouts/NavLayout'

import { apiClientService } from '@/services/clientApi'

import { Articles } from '@/app/(home)/_components'
import { getAuth } from '@/providers/getAuth'


export default async function ArticlesPage() {
  const { isAuth } = getAuth()

  const articles = await apiClientService.getAllArticles()

  return <NavLayout isAuth={isAuth}>{isAuth && <Articles articles={articles} />}</NavLayout>
}
