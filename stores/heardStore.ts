import { atom } from 'nanostores'

export type HeardState = {
  heartLiked: Record<number, boolean>
}

export const heardState = atom<HeardState>({
  heartLiked: {},
})

const updateState = (commentId: number) => {
  const state = heardState.get()

  const newHeartLiked = { ...state.heartLiked }

  if (state.heartLiked[commentId]) {
    delete newHeartLiked[commentId]
  } else {
    newHeartLiked[commentId] = true
  }

  heardState.set({
    heartLiked: newHeartLiked,
  })
}

export const handleHeartClick = (commentId: number) => {
  updateState(commentId)
}

if (typeof window !== 'undefined') {
  const storedState = sessionStorage.getItem('heardState')
  if (storedState) {
    heardState.set(JSON.parse(storedState))
  }
}

heardState.listen((state) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('heardState', JSON.stringify(state))
  }
})
