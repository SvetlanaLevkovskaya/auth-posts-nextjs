import { type FC } from 'react'

import { useStore } from '@nanostores/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'

import { customToastSuccess } from '@/ui/CustomToast/CustomToast'

import styles from './Header.module.css'

import { logout, userStore } from '@/stores/userStore'


interface HeaderProps {
  isAuth: boolean
}

export const Header: FC<HeaderProps> = ({ isAuth }) => {
  const router = useRouter()

  const { username } = useStore(userStore)

  const handleLogout = () => {
    logout()
    router.push('/login')
    customToastSuccess(`User ${username} logged out`)
  }

  const handleLogoClick = () => {
    router.push('/')
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.right}>
          <Button color="grey" onClick={handleLogoClick}>
            LOGO
          </Button>
          {isAuth && (
            <Button color="purple" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
