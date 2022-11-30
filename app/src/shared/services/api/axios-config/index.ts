import axios from 'axios'
import { Environment } from '../../../environment'
import { errorInterceptor } from './interceptors'

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json"
  }
})

Api.interceptors.response.use(
  response => response,
  error => errorInterceptor(error)
)

export { Api }
