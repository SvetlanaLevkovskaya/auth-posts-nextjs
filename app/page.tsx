import { NavLayout } from '@/components/Layouts/NavLayout'

import { Articles } from '@/app/(home)/_components'
import { getAuth } from '@/app/providers/getAuth'
import { apiClientService } from '@/app/services/clientApi'


export default async function ArticlesPage() {
  const { isAuth } = getAuth()

  const articles = await apiClientService.getAllArticles()

  return <NavLayout isAuth={isAuth}>{isAuth && <Articles articles={articles} />}</NavLayout>
}
