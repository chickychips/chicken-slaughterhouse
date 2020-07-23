import axios from 'axios'
import store from 'store'
import { notification } from 'antd'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  // baseURL: 'http://192.168.1.101:3001/api',
  // baseURL: 'https://murmuring-dawn-74401.herokuapp.com/api',
  // baseURL: '/api',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.request.use(request => {
  console.log(request)
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers['x-access-token'] = `${accessToken}`
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  console.log(data)
  if (data) {
    if (data.message !== 'No token provided!')
      notification.warning({
        message: data.message,
      })
  }
})

export default apiClient
