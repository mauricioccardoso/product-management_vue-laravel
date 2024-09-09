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

    const respData = await httpClient
      .post('/login', data)
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
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
    await router.push({ name: 'products' })
  }

  const clear = async () => {
    isAuth.value = false
    userDataStore.clear()
    sessionStorage.clear()

    await router.push({ name: 'login' })
  }

  const checkToken = async (): Promise<void> => {
    const respData = await httpClient
      .get('/check')
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
        return error
      })

    if (respData?.message) {
      notificationStore.showNotification('Sessão expirada. Faça login novamente!', 'error')
      return
    }

    isAuth.value = true
  }

  return { isAuth, makingLoginRequest, login, clear, checkToken }
})
