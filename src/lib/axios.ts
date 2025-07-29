import axios from 'axios'
import { getToken } from '../utils/sessionMethods'
import { env } from '@/config/env'

const baseUrl = env.VITE_API_BASE_URL || 'http://localhost:3333'

export const api = axios.create({
  baseURL: baseUrl,
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
