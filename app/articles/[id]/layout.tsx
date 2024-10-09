import { ReactNode, Suspense } from 'react'

import { Spinner } from '@/ui/index'

export default function Layout({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>
}
