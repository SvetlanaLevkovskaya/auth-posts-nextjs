import { cookies } from 'next/headers'

export function getAuth() {
  const username = cookies().get('username')?.value

  const isAuth = !!username

  return { username, isAuth }
}
