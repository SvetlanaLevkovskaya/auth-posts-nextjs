import { redirect } from 'next/navigation'

import { LoginForm } from '@/app/login/_ui'
import { AppRoutes } from '@/lib/api/routes'
import { getAuth } from '@/providers/getAuth'


export default function LoginPage() {
  const { isAuth } = getAuth()
  if (isAuth) redirect(AppRoutes.articles)

  return <LoginForm />
}
