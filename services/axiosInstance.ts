import axios from 'axios'
import Cookies from 'js-cookie'

import { handleApiError } from './errorHandler'
import { tokenService } from './tokenService'


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
        await tokenService()
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

export default instanceAxios
