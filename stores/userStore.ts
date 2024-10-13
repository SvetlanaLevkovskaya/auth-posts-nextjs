import Cookies from 'js-cookie'
import { atom } from 'nanostores'

interface User {
  username: string | null
  password?: string | null
}

export const userStore = atom<User>({ username: null, password: null })

export const login = (username: string, password: string) => {
  userStore.set({ username, password })
  Cookies.set('username', username)
  Cookies.set('password', password)
}

export const logout = () => {
  Cookies.remove('username')
  Cookies.remove('password')
  userStore.set({ username: null, password: null })
}
