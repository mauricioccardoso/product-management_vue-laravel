import httpClient from '@/http'
import router from '@/router'
import type { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './NotificationStore'
import { useUserDataStore } from './UserDataStore'

export const useAuthDataStore = defineStore('authDataStore', () => {
  // Variables
  const notificationStore = useNotificationStore()
  const userDataStore = useUserDataStore()
  const isAuth = ref(false)
  const makingLoginRequest = ref(false)

  // Functions
  const login = async (data: { email: string; password: string }) => {
    makingLoginRequest.value = true

    httpClient.interceptors.request.clear()

    const respData = await httpClient
      .post('/login', data)
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
        console.log('not ok')
        return error
      })
      .finally(() => {
        makingLoginRequest.value = false
      })

    if (respData?.status === 403) {
      notificationStore.showNotification('Email e/ou senha inválidos', 'error')
      return
    }

    sessionStorage.setItem('ACCESS_TOKEN', respData.token)
    userDataStore.setUserData(respData.user)
    isAuth.value = true
    notificationStore.showNotification('Login realizado', 'success')
    await router.push({ name: 'home' })
  }

  return { isAuth, makingLoginRequest, login }
})
