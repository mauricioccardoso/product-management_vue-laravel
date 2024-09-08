import axios, { type InternalAxiosRequestConfig } from 'axios'

import type { AxiosInstance } from 'axios'

export const baseURL: string = 'http://localhost:8080/api'

const httpClient: AxiosInstance = axios.create({
  baseURL
})

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token: string = sessionStorage.getItem('ACCESS_TOKEN')

  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default httpClient
