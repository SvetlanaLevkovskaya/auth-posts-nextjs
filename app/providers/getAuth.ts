import { cookies } from 'next/headers'

export function getAuth() {
  const accessToken = cookies().get('access_token')?.value
  const isAuth = !!accessToken

  return { isAuth }
}
