import axios from 'axios'

import { customToastError } from '@/components/ui'


export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Произошла неизвестная ошибка'

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('API Error:', error.response)
      errorMessage =
        error.response.data?.detail ||
        error.response.data?.old_password?.[0] ||
        error.response.data?.username?.[0]
    } else if (error.request) {
      console.error('No Response Error:', error.request)
      errorMessage = 'No response from server'
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    errorMessage = error.message
  } else {
    console.error('Unexpected Error:', error)
    errorMessage = 'An unexpected error occurred'
  }
  customToastError(errorMessage)
  return errorMessage
}
