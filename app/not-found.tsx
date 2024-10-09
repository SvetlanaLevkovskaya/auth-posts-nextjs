import { NavLayout } from '@/components/Layouts/NavLayout'
import { ButtonNotFound } from '@/components/NotFound/ButtonNotFound'
import styles from '@/components/NotFound/NotFound.module.scss'

import { getAuth } from '@/app/providers/getAuth'


export default async function NotFoundPage() {
  const { isAuth } = getAuth()

  return (

      <NavLayout isAuth={isAuth} disabledPadding>
        <div className={styles.block}>
          <h1 className={styles.title}>Oh, it seems you&#39;re a little lost...</h1>
          <span className={styles.subtitle}>The page you are looking for does not exist</span>
          <ButtonNotFound />
        </div>
      </NavLayout>
  )
}
