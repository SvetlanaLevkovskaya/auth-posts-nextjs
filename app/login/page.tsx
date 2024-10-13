import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/Login/LoginForm'

import { getAuth } from '@/providers/getAuth'


export default function LoginPage() {
  const { isAuth } = getAuth()
  if (isAuth) redirect('/')

  return <LoginForm />
}
