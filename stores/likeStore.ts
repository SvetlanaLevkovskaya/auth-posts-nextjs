import { atom } from 'nanostores'

export type LikeState = {
  likes: Record<number, number>
  dislikes: Record<number, number>
  userLiked: Record<number, boolean>
  userDisliked: Record<number, boolean>
}

export const likeState = atom<LikeState>({
  likes: {},
  dislikes: {},
  userLiked: {},
  userDisliked: {},
})

const updateState = (commentId: number, type: 'like' | 'dislike' ) => {
  const state = likeState.get()
  const newLikes = { ...state.likes }
  const newDislikes = { ...state.dislikes }
  const newUserLiked = { ...state.userLiked }
  const newUserDisliked = { ...state.userDisliked }

  if (type === 'like') {
    if (state.userLiked[commentId]) {
      newLikes[commentId]--
      delete newUserLiked[commentId]
    } else {
      newLikes[commentId] = (state.likes[commentId] || 0) + 1
      newUserLiked[commentId] = true
      if (state.userDisliked[commentId]) {
        newDislikes[commentId]--
        delete newUserDisliked[commentId]
      }
    }
  } else if (type === 'dislike') {
    if (state.userDisliked[commentId]) {
      newDislikes[commentId]--
      delete newUserDisliked[commentId]
    } else {
      newDislikes[commentId] = (state.dislikes[commentId] || 0) + 1
      newUserDisliked[commentId] = true
      if (state.userLiked[commentId]) {
        newLikes[commentId]--
        delete newUserLiked[commentId]
      }
    }
  }

  likeState.set({
    likes: newLikes,
    dislikes: newDislikes,
    userLiked: newUserLiked,
    userDisliked: newUserDisliked,
  })
}

export const handleLikeClick = (commentId: number) => {
  updateState(commentId, 'like')
}

export const handleDislikeClick = (commentId: number) => {
  updateState(commentId, 'dislike')
}

if (typeof window !== 'undefined') {
  const storedState = sessionStorage.getItem('likeState')
  if (storedState) {
    likeState.set(JSON.parse(storedState))
  }
}

likeState.listen((state) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('likeState', JSON.stringify(state))
  }
})
