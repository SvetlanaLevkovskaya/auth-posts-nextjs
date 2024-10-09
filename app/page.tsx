import { NavLayout } from '@/components/Layouts/NavLayout'

import { Articles } from '@/app/(home)/_components'
import { getAuth } from '@/app/providers/getAuth'
import { apiClientService } from '@/app/services/clientApi'
import { token } from '@/app/constants'

export default async function ArticlesPage() {
  const { isAuth } = getAuth()

  const articles = await apiClientService.getAllArticles(token)

  return <NavLayout isAuth={true}>{isAuth && <Articles  articles={articles.data}/>}</NavLayout>
}
