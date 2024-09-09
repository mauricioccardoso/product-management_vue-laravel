import httpClient from '@/http'
import type { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationStore } from './NotificationStore'

export const useProductsStore = defineStore('productsStore', () => {
  const notificationStore = useNotificationStore()

  const productsPaginated = ref()

  const getProducts = async () => {
    const respData = await httpClient
      .get('/product')
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
        return error
      })

    if (respData?.message) {
      notificationStore.showNotification(
        'Falha ao carregar produtos. Tente novamente mais tarde',
        'error'
      )
      return
    }

    productsPaginated.value = respData
  }

  return { productsPaginated, getProducts }
})
