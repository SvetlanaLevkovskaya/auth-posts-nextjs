import { useStore } from '@nanostores/react'
import { useRouter } from 'next/navigation'

import { customToastSuccess } from '@/ui/CustomToast/CustomToast'
import { Button } from '@/ui/index'

import { AppRoutes } from '@/lib/api/routes'
import { logout, userStore } from '@/stores/userStore'


export const Header = () => {
  const router = useRouter()

  const { username } = useStore(userStore)

  const handleLogout = () => {
    logout()
    router.push(AppRoutes.login)
    customToastSuccess(`User ${username} logged out`)
  }

  const handleLogoClick = () => {
    router.push(AppRoutes.articles)
  }

  return (
    <div className="sticky top-0 z-5 bg-gray-dark text-gray-dark">
      <div className="py-4 pl-4 pr-6 tb:px-16 transition-all2">
        <div className="flex-center-between text-gray-5">
          <Button color="grey" onClick={handleLogoClick}>
            LOGO
          </Button>
          <Button color="purple" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
