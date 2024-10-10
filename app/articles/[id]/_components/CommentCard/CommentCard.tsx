'use client'

import { FC, KeyboardEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui'

import { TextArea } from '@/ui/TextArea/TextArea'

import { token } from '@/app/constants'
import { apiClientService } from '@/app/services/clientApi'
import { Comment } from '@/types'


type CommentCardProps = {
  comment: Comment
  articleId: number
}

type CommentFormValues = {
  content: string
}

export const CommentCard: FC<CommentCardProps> = ({ comment, articleId }) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    formState: { errors: editErrors },
  } = useForm<CommentFormValues>({
    defaultValues: { content: currentComment.content },
  })

  const {
    register: registerReply,
    handleSubmit: handleSubmitReply,
    reset: resetReply,
    formState: { errors: replyErrors },
  } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  })

  const handleContentUpdated = async (data: CommentFormValues) => {
    try {
      await apiClientService.updateCommentContent(token, articleId, currentComment.id, {
        content: data.content,
      })
      setCurrentComment((prevComment) => ({
        ...prevComment,
        content: data.content,
      }))
      setIsEditing(false)
      resetEdit()
    } catch (error) {
      console.error('Ошибка при обновлении комментария:', error)
    }
  }

  const handleReply = async (data: CommentFormValues) => {
    try {
      const newReply = await apiClientService.addCommentToArticle(token, articleId, {
        content: data.content,
        parent: currentComment.id,
      })
      setCurrentComment((prevComment) => ({
        ...prevComment,
        children: [...prevComment.children, newReply.data],
      }))
      resetReply()
      setIsReplying(false)
    } catch (error) {
      console.error('Ошибка при добавлении ответа:', error)
    }
  }

  const handleKeyDownEdit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitEdit(handleContentUpdated)()
    }
  }

  const handleKeyDownReply = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitReply(handleReply)()
    }
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border-black border min-w-72">
      {isEditing ? (
        <form onSubmit={ handleSubmitEdit(handleContentUpdated) }>
          <TextArea
            register={ registerEdit('content') }
            onKeyDown={ handleKeyDownEdit }
            error={ editErrors.content?.message }
          />
          <div className="flex justify-end gap-2 mt-2 mb-2">
            <Button color="neon" size="m">Сохранить</Button>
            <Button color="purple" size="m" onClick={ () => setIsEditing(false) }>Отменить</Button>
          </div>
        </form>
      ) : (
        <>
          <p className="mt-2 text-gray-4" onClick={() => setIsEditing(true)}>
            {currentComment.content}
          </p>
          <small className="text-gray-4 block mt-2">
            {currentComment?.author?.username || 'Anonymous'}
          </small>
          <Button
            color="grey"
            size="s"
            onClick={(e) => {
              e.stopPropagation()
              setIsReplying(!isReplying)
            }}
            className="mt-2 mb-2"
          >
            Ответить
          </Button>
        </>
      )}

      {isReplying && !isEditing && (
        <form onSubmit={ handleSubmitReply(handleReply) } className="mt-2">
          <TextArea
            register={registerReply('content')}
            onKeyDown={handleKeyDownReply}
            error={replyErrors.content?.message}
          />
          <div className="flex justify-end gap-2 mt-2 mb-2">
            <Button color="neon" size="m">
              Ответить
            </Button>
            <Button color="purple" size="m" onClick={ () => setIsReplying(false) }>
              Отмена
            </Button>
          </div>
        </form>
      ) }

      { currentComment?.children?.length > 0 && (
        <ul>
          {currentComment.children.map((childComment, index) => (
            <CommentCard
              key={`${childComment.id}-${index}`}
              comment={childComment}
              articleId={articleId}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
