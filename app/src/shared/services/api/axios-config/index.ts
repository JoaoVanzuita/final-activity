import axios, { AxiosRequestConfig } from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

Api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

    return config;
  },
  (error) => error
)

Api.interceptors.response.use(
  response => response,
  error => errorInterceptor(error)
)

export { Api }
