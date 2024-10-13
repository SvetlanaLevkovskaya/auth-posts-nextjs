import instanceAxios from '@/services/axiosInstance'

import { ApiRoutes } from '@/lib/api/routes'
import { CommentFormData } from '@/types'


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

    console.log('response.data', response.data)
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

  login: async (data: { username: string; password: string }) => {
    const response = await instanceAxios.post(`/token/`, data)
    return response.data
  },

  registration: async (data: {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
  }) => {
    const response = await instanceAxios.post(`/registration/`, data)
    return response.data
  },

  changePassword: async (data: {
    old_password: string
    password: string
    confirmed_password: string
  }) => {
    const response = await instanceAxios.put('/change-password/', data)
    return response.data
  },
}
