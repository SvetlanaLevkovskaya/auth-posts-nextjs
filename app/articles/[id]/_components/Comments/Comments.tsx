'use client'

import { FC, useEffect, useState } from 'react'

import { CommentCard } from '@/app/articles/[id]/_components'
import { token } from '@/app/constants'
import { apiClientService } from '@/app/services/clientApi'
import { Comment } from '@/types'


type Props = {
  articleId: number
  initialComments: Comment[]
}

export const Comments: FC<Props> = ({ articleId, initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newComment = await apiClientService.addCommentToArticle(token, articleId, { content })
      setComments((prevComments) => [...prevComments, newComment.data])
      setContent('')
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!hydrated) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-s_text font-bold mb-4">Comments ({comments?.length})</h2>

      <form onSubmit={handleAddComment} className="flex flex-col gap-4 mb-4">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите ваш комментарий..."
          required
          disabled={loading}
          className="bg-gray-3 text-white"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Оставить комментарий'}
        </button>
      </form>
      <hr className="bg-gray-3 my-4" />
      <ul className="space-y-4">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  )
}
