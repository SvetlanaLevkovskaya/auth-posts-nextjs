import { useStore } from '@nanostores/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'

import { customToastSuccess } from '@/ui/CustomToast/CustomToast'

import styles from './Header.module.css'

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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.right}>
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
