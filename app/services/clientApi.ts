import axios from 'axios'
import Cookies from 'js-cookie'

import { customToastError } from '@/components/ui'

import { refreshAccessToken } from '@/app/providers/refreshAccessToken'
import { ApiRoutes } from '@/lib/api/routes'
import { CommentFormData } from '@/types'


export const handleApiError = (error: unknown): string => {
  let errorMessage = 'Произошла неизвестная ошибка'

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('API Error:', error.message)
      errorMessage = error.response.data?.detail || error.message || error.response.statusText
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

const instanceAxios = axios.create({
  baseURL: 'https://darkdes-django-t3b02.tw1.ru/api/v1',
  headers: {
    'Content-Type': 'application/json; charset=utf8',
  },
  withCredentials: false,
  paramsSerializer: {
    indexes: null,
  },
})

instanceAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instanceAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        await refreshAccessToken()
        originalRequest.headers['Authorization'] = `Bearer ${Cookies.get('access_token')}`
        return instanceAxios(originalRequest)
      } catch (refreshError) {
        console.error('Error refreshing token:', handleApiError(refreshError))
        return Promise.reject(refreshError)
      }
    } else {
      console.error('API Error:', handleApiError(error))
    }
    return Promise.reject(error)
  }
)

export const apiClientService = {
  getAllArticles: async () => {
    const response = await instanceAxios.get(ApiRoutes.articles)
    return response.data
  },

  getAllArticleById: async (id: string | number) => {
    const response = await instanceAxios.get(`${ApiRoutes.article}${id}`)
    return response.data
  },

  createArticle: async (data: FormData) => {
    const response = await instanceAxios.post(ApiRoutes.articles, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  updateArticle: async (id: number, data: FormData) => {
    const response = await instanceAxios.put(`${ApiRoutes.article}${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  getCommentsByArticleId: async (articleId: string | number) => {
    const response = await instanceAxios.get(`${ApiRoutes.articles}${articleId}/comments/`)
    return response.data
  },

  addCommentToArticle: async (articleId: string | number, data: CommentFormData) => {
    const response = await instanceAxios.post(`${ApiRoutes.articles}${articleId}/comments/`, data)
    return response.data
  },
  updateCommentContent: async (
    articleId: string | number,
    commentId: number,
    data: CommentFormData
  ) => {
    const response = await instanceAxios.put(
      `${ApiRoutes.articles}${articleId}/comments/${commentId}/`,
      data
    )
    return response.data
  },
}
