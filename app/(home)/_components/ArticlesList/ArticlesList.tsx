import Link from 'next/link'

import { Button, ImageWithFallback } from '@/components/ui'

import { CreateArticleForm } from '@/app/(home)/_components'
import { useArticles } from '@/providers/ArticlesProvider'


export const ArticlesList = () => {
  const { articles } = useArticles()

  if (!articles.length) return null

  return (
    <div className='flex gap-6'>
      <div className="flex flex-col justify-center w-full gap-6 px-0 tb:px-10">
        { articles &&
          articles.map((article, index) => {
            const isContentLong = article?.content?.length > 100
            const displayedContent = isContentLong
              ? article.content.slice(0, 100) + '...'
              : article.content

            return (
              <div
                key={ `${ article.id }-${ index }` }
                className={ 'bg-gray-2 shadow-md rounded-lg text-s_body overflow-hidden p-4 min-w-72' }
              >
                <Link href={ `/articles/${ article.id }` } className="flex w-full flex-col tb:flex-row">
                  <ImageWithFallback
                    src={ article.image || '' }
                    alt={ article.title }
                    width={ 192 }
                    height={ 192 }
                  />
                  <div className="flex flex-col justify-between flex-grow">
                    <div className="flex flex-col justify-between">
                      <h2 className="break-all whitespace-normal">{ article?.title?.toUpperCase() }</h2>
                      <p className="mt-2 text-gray-4 break-all whitespace-normal">
                        { displayedContent }
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button color="neon" size="m">
                        Read more
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }) }
      </div>

      <CreateArticleForm />
    </div>
  )
}
