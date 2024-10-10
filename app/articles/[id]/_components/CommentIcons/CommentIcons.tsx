'use client'

import { FC, ReactNode } from 'react'
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

import { useStore } from '@nanostores/react'

import { Button } from '@/components/ui'

import { handleDislikeClick, handleLikeClick, likeState } from '@/stores/likeStore'


type Props = {
  commentId: number
}

export const CommentIcons: FC<Props> = ({ commentId }) => {
  const state = useStore(likeState)
  const likeCount = state.likes[commentId]
  const dislikeCount = state.dislikes[commentId]

  const renderButton = (
    interactionCount: number,
    IconActive: ReactNode,
    IconInactive: ReactNode,
    onClick: () => void,
    count: number | null
  ) => (
    <div className="flex-center-center w-14">
      <Button size="xs" color="white" onClick={onClick}>
        {interactionCount ? IconActive : IconInactive}
      </Button>
      <span className="text-gray-4 text-s_text min-w-2">{count || null}</span>
    </div>
  )

  return (
    <div className="flex items-center mt-4">
      {renderButton(
        likeCount,
        <FaThumbsUp className="text-gray-3 transition-all2 hover:text-gray-4" size="16" />,
        <FaRegThumbsUp className="text-gray-3 transition-all2 hover:text-gray-4" size="16" />,
        () => handleLikeClick(commentId),
        likeCount || null
      )}

      {renderButton(
        dislikeCount,
        <FaThumbsDown className="text-gray-3 transition-all2 hover:text-gray-4" size="16" />,
        <FaRegThumbsDown className="text-gray-3 transition-all2 hover:text-gray-4" size="16" />,
        () => handleDislikeClick(commentId),
        dislikeCount || null
      )}
    </div>
  )
}
