'use client'

import { ReactNode, useEffect } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { userStore } from '@/stores/userStore'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')

    if (username) {
      userStore.set({ username, password })
    } else {
      router.push('/login')
    }
  }, [router])

  return <>{children}</>
}
