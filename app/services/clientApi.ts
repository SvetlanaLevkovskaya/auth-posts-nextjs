import axios from 'axios'

import { ApiRoutes } from '@/lib/api/routes'


export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      return error.message || error.response.statusText
    } else if (error.request) {
      console.error('No Response Error:', error.request.statusText)
      return error.request.statusText
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    return error.message
  } else {
    console.error('Unexpected Error:', error)
    return error as string
  }
  return 'Произошла неизвестная ошибка'
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

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export const apiClientService = {
  getAllArticles: async (token: string | null) => {
    return instanceAxios.get(ApiRoutes.articles, {
      headers: { Authorization: `Bearer ${ token }` },
    })
  },

  getAllArticleById: async (token: string | null, id: any) => {
    return instanceAxios.get(`${ ApiRoutes.article }${ id }`, {
      headers: { Authorization: `Bearer ${ token }` },
    })
  },
  createArticle: async (data: any, token: string) => {
    return instanceAxios.post(ApiRoutes.articles, data, {
      headers: { Authorization: `Bearer ${ token }`, 'Content-Type': 'multipart/form-data' },
    });
  },

  updateArticle: async (id: any, data: FormData, token: string) => {
    return instanceAxios.put(`${ ApiRoutes.article }${ id }/`, data, {
      headers: { Authorization: `Bearer ${ token }`, 'Content-Type': 'multipart/form-data' },
    });
  },

  getCommentsByArticleId: async (token: string, articleId: number) => {
    return instanceAxios.get(`${ ApiRoutes.articles }/${ articleId }/comments/`, {
      headers: { Authorization: `Bearer ${ token }` },
    });
  },
  addCommentToArticle: async (token: string, articleId: number, data: { content: string; parent?: number | null }) => {
    return instanceAxios.post(`${ApiRoutes.articles}/${articleId}/comments/`, data, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
  },
}
