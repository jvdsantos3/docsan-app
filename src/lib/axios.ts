import axios, { AxiosError } from 'axios'
import { getToken, removeTokens, storeTokens } from '../utils/sessionMethods'
import { env } from '@/config/env'

const baseUrl = env.VITE_API_BASE_URL || 'http://localhost:3333'

let isRefreshing = false
let failedRequestsQueue: Array<{
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}> = []

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

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

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (originalRequest && error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true

        axios
          .post('/refresh', undefined, {
            baseURL: baseUrl,
            withCredentials: true,
            headers,
          })
          .then((response) => {
            const { access_token } = response.data

            storeTokens(access_token)
            api.defaults.headers['Authorization'] = `Bearer ${access_token}`

            failedRequestsQueue.forEach((request) => {
              request.onSuccess(access_token)
            })
            failedRequestsQueue = []
          })
          .catch((err: AxiosError) => {
            failedRequestsQueue.forEach((request) => {
              request.onFailure(err)
            })
            failedRequestsQueue = []

            removeTokens()
            window.location.href = '/sign-in'
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            resolve(api(originalRequest))
          },
          onFailure: (err) => {
            reject(err)
          },
        })
      })
    }

    return Promise.reject(error)
  },
)
