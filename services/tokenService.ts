import axios from 'axios'
import Cookies from 'js-cookie'


export const tokenService = async () => {
  try {
    const refresh = Cookies.get('refresh_token')

    if (refresh) {
      const response = await axios.post(
        'https://darkdes-django-t3b02.tw1.ru/api/v1/token/refresh/',
        {
          refresh,
        }
      )
      const { access } = response.data
      Cookies.set('access_token', access)
    }
  } catch (error) {
    console.error('Failed to refresh access token', error)
  }
}
