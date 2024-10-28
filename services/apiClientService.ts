import instanceAxios from '@/services/axiosInstance'

import { ApiRoutes } from '@/lib/api/routes'
import {
  Article,
  ChangePasswordDto,
  ChangePasswordFormData,
  Comment,
  CommentFormData,
  CreateAndUpdateArticleDto,
  CreateAndUpdateCommentDto,
  LoginDto,
  LoginFormData,
  RegistrationDto,
  RegistrationRequest,
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

  createArticle: async (data: FormData): Promise<CreateAndUpdateArticleDto> => {
    const response = await instanceAxios.post<CreateAndUpdateArticleDto>(ApiRoutes.articles, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  updateArticle: async (id: number, data: FormData): Promise<CreateAndUpdateArticleDto> => {
    const response = await instanceAxios.put<CreateAndUpdateArticleDto>(
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
  ): Promise<CreateAndUpdateCommentDto> => {
    const response = await instanceAxios.post<CreateAndUpdateCommentDto>(
      `${ApiRoutes.articles}${articleId}/comments/`,
      data
    )
    return response.data
  },

  updateCommentContent: async (
    articleId: string | number,
    commentId: number,
    data: CommentFormData
  ): Promise<CreateAndUpdateCommentDto> => {
    const response = await instanceAxios.put<CreateAndUpdateCommentDto>(
      `${ApiRoutes.articles}${articleId}/comments/${commentId}/`,
      data
    )
    return response.data
  },

  deleteCommentById: async (articleId: string | number, commentId: number): Promise<void> => {
    await instanceAxios.delete(`${ApiRoutes.articles}${articleId}/comments/${commentId}/`)
  },

  login: async (data: LoginFormData): Promise<LoginDto> => {
    const response = await instanceAxios.post<LoginDto>(`${ApiRoutes.token}`, data)
    return response.data
  },

  registration: async (data: RegistrationRequest): Promise<RegistrationDto> => {
    const response = await instanceAxios.post<RegistrationDto>(`${ApiRoutes.registration}`, data)
    return response.data
  },

  changePassword: async (data: ChangePasswordFormData): Promise<{ success: boolean }> => {
    const response = await instanceAxios.put<ChangePasswordDto>(`${ApiRoutes.changePassword}`, data)
    const { Success: success } = response.data
    return { success }
  },
}
