import instanceAxios from '@/services/axiosInstance'

import { ApiRoutes } from '@/lib/api/routes'
import {
  Article,
  ChangePasswordFormData,
  ChangePasswordResponse,
  Comment,
  CommentFormData,
  CreateAndUpdateArticleResponse,
  CreateAndUpdateCommentResponse,
  LoginFormData,
  LoginResponse,
  RegistrationRequest,
  RegistrationResponse,
} from '@/types'

export const apiClientService = {
  getAllArticles: async (): Promise<Article[]> => {
    const response = await instanceAxios.get<Article[]>(ApiRoutes.articles)
    return response.data
  },

  deleteArticle: async (articleId: number): Promise<void> => {
    return await instanceAxios.delete(`${ApiRoutes.articles}${articleId}/`)
  },

  getAllArticleById: async (id: string | number): Promise<Article> => {
    const response = await instanceAxios.get<Article>(`${ApiRoutes.article}${id}/`)
    return response.data
  },

  createArticle: async (data: FormData): Promise<CreateAndUpdateArticleResponse> => {
    const response = await instanceAxios.post<CreateAndUpdateArticleResponse>(
      ApiRoutes.articles,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return response.data
  },

  updateArticle: async (id: number, data: FormData): Promise<CreateAndUpdateArticleResponse> => {
    const response = await instanceAxios.put<CreateAndUpdateArticleResponse>(
      `${ApiRoutes.article}${id}/`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return response.data
  },

  getCommentsByArticleId: async (articleId: string | number): Promise<Comment[]> => {
    const response = await instanceAxios.get<Comment[]>(
      `${ApiRoutes.articles}${articleId}/comments/`
    )
    return response.data
  },

  addCommentToArticle: async (
    articleId: string | number,
    data: CommentFormData
  ): Promise<CreateAndUpdateCommentResponse> => {
    const response = await instanceAxios.post<CreateAndUpdateCommentResponse>(
      `${ApiRoutes.articles}${articleId}/comments/`,
      data
    )
    return response.data
  },

  updateCommentContent: async (
    articleId: string | number,
    commentId: number,
    data: CommentFormData
  ): Promise<CreateAndUpdateCommentResponse> => {
    const response = await instanceAxios.put<CreateAndUpdateCommentResponse>(
      `${ApiRoutes.articles}${articleId}/comments/${commentId}/`,
      data
    )
    return response.data
  },

  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await instanceAxios.post<LoginResponse>(`${ApiRoutes.token}`, data)
    return response.data
  },

  registration: async (data: RegistrationRequest): Promise<RegistrationResponse> => {
    const response = await instanceAxios.post<RegistrationResponse>(
      `${ApiRoutes.registration}`,
      data
    )
    return response.data
  },

  changePassword: async (data: ChangePasswordFormData): Promise<{ success: boolean }> => {
    const response = await instanceAxios.put<ChangePasswordResponse>(
      `${ApiRoutes.changePassword}`,
      data
    )
    const { Success: success } = response.data
    return { success }
  },
}
