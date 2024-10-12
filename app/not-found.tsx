import { NavLayout } from '@/components/Layouts/NavLayout'
import { ButtonNotFound } from '@/components/NotFound/ButtonNotFound'


export default async function NotFoundPage() {
  return (
    <NavLayout disabledPadding>
      <div className="h-full flex-center-center flex-col gap-5">
        <h1 className="text-s_h4">Oh, it seems you&#39;re a little lost...</h1>
        <span className="text-s_body text-gray-4">The page you are looking for does not exist</span>
        <ButtonNotFound />
      </div>
    </NavLayout>
  )
}
