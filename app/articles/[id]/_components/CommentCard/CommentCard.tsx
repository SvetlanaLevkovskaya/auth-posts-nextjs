'use client'

import { FC, useEffect, useState } from 'react'

import { useStore } from '@nanostores/react'
import axios from 'axios'

import { Button, customToastError, customToastSuccess } from '@/components/ui'

import { apiClientService } from '@/services/apiClientService'

import {
  CommentChildren,
  CommentEditForm,
  CommentReplyForm,
} from '@/app/articles/[id]/_components/CommentCardItems'
import { useComments } from '@/providers/CommentsProvider'
import { userStore } from '@/stores/userStore'
import { Comment, CommentFormData } from '@/types'


type Props = {
  comment: Comment
  articleId: number
}

export const CommentCard: FC<Props> = ({ comment, articleId }) => {
  const [currentComment, setCurrentComment] = useState<Comment>(comment)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isReplyingLoading, setIsReplyingLoading] = useState<boolean>(false)
  const [isDeletingLoading, setIsDeletingLoading] = useState<boolean>(false)
  const { username } = useStore(userStore)
  const { setComments } = useComments()

  const isAuthor = comment.author.username === username

  useEffect(() => {
    setCurrentComment(comment)
  }, [comment])

  const handleContentUpdated = async (data: CommentFormData) => {
    try {
      await apiClientService.updateCommentContent(articleId, currentComment.id, {
        content: data.content,
      })

      const updatedComments = await apiClientService.getCommentsByArticleId(articleId)

      const updateCommentById = (
        comments: Comment[],
        commentId: number,
        updatedContent: string
      ): Comment[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: updatedContent }
          }
          if (comment.children?.length) {
            return {
              ...comment,
              children: updateCommentById(comment.children, commentId, updatedContent),
            }
          }
          return comment
        })
      }

      const findCommentById = (comments: Comment[], commentId: number): Comment | undefined => {
        for (const comment of comments) {
          if (comment.id === commentId) {
            return comment
          }
          if (comment.children?.length) {
            const foundInChildren = findCommentById(comment.children, commentId)
            if (foundInChildren) {
              return foundInChildren
            }
          }
        }
        return undefined
      }

      const updatedCommentsWithNewContent = updateCommentById(
        updatedComments,
        currentComment.id,
        data.content
      )

      const updatedCurrentComment = findCommentById(
        updatedCommentsWithNewContent,
        currentComment.id
      )

      if (updatedCurrentComment) {
        setCurrentComment(updatedCurrentComment)
        customToastSuccess('Комментарий успешно обновлен')
      } else {
        customToastError('Не удалось обновить комментарий')
      }

      setIsEditing(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          customToastError(error.response.data?.detail || error.response.data.content[0])
        }
      }
    }
  }

  const handleReply = async (data: CommentFormData) => {
    setIsReplyingLoading(true)
    try {
      await apiClientService.addCommentToArticle(articleId, {
        content: data.content,
        parent: currentComment.id,
      })

      const updatedComments = await apiClientService.getCommentsByArticleId(articleId)

      const findCommentById = (comments: Comment[], commentId: number): Comment | undefined => {
        for (const comment of comments) {
          if (comment.id === commentId) {
            return comment
          }
          if (comment.children?.length) {
            const foundInChildren = findCommentById(comment.children, commentId)
            if (foundInChildren) {
              return foundInChildren
            }
          }
        }
        return undefined
      }

      const updatedCurrentComment = findCommentById(updatedComments, currentComment.id)

      if (updatedCurrentComment) {
        setCurrentComment(updatedCurrentComment)
        customToastSuccess('Ответ на комментарий успешно добавлен')
      } else {
        customToastError('Не удалось обновить комментарий')
      }

      setIsReplying(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        customToastError(error.response.data?.detail || error.response.data.content[0])
      }
    } finally {
      setIsReplyingLoading(false)
    }
  }

  const onDelete = async () => {
    setIsDeletingLoading(true)
    try {
      await apiClientService.deleteCommentById(articleId, currentComment.id)
      const updatedComments = await apiClientService.getCommentsByArticleId(articleId)

      setComments(updatedComments)
      customToastSuccess('Комментарий успешно удален')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        customToastError(error.response.data?.detail || error.response.data.content[0])
      }
    } finally {
      setIsDeletingLoading(false)
    }
  }

  return (
    <li className="bg-white p-4 rounded-lg shadow-lg border min-w-72 mb-2">
      {isEditing ? (
        <CommentEditForm
          initialContent={currentComment.content}
          onSubmit={handleContentUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <p className="mt-2 text-gray-3 break-words" onClick={() => setIsEditing(true)}>
            {currentComment?.content}
          </p>
          <small className="text-gray-4 block mt-2">
            {currentComment?.author?.username || username}
          </small>
          <div className="flex gap-1.5">
            <Button
              color="grey"
              size="s"
              disabled={isReplyingLoading}
              onClick={(e) => {
                e.stopPropagation()
                setIsReplying(!isReplying)
              }}
              className="mt-2 mb-2"
            >
              Reply
            </Button>
            {isAuthor && (
              <Button
                color="grey"
                size="s"
                disabled={isDeletingLoading}
                onClick={onDelete}
                className="mt-2 mb-2"
              >
                Delete
              </Button>
            )}
          </div>
        </>
      )}

      {isReplying && !isEditing && (
        <CommentReplyForm onSubmit={handleReply} onCancel={() => setIsReplying(false)} />
      )}

      {currentComment?.children?.length > 0 && (
        <CommentChildren
          key={currentComment.id}
          childrenComments={currentComment.children}
          articleId={articleId}
        />
      )}
    </li>
  )
}
