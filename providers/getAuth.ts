import { cookies } from 'next/headers'

export function getAuth() {
  const accessToken = cookies().get('username')?.value
  const isAuth = !!accessToken

  return { isAuth }
}
