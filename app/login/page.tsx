import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/Login/LoginForm'

import { AppRoutes } from '@/lib/api/routes'
import { getAuth } from '@/providers/getAuth'


export default function LoginPage() {
  const { isAuth } = getAuth()
  if (isAuth) redirect(AppRoutes.articles)

  return <LoginForm />
}
