import httpClient from '@/http'
import { useNotificationStore } from '@/stores/NotificationStore'
import type { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

type Category = {
  id: number
  name: string
}

export const useFormCreateProductStore = defineStore('formCreateProductStore', () => {
  const notificationStore = useNotificationStore()

  const isFormOpen: Ref<boolean> = ref(false)
  const makingCreateRequest = ref(false)

  const categories: Ref<Category[]> = ref([])

  const setIsFormOpen = (value): void => {
    isFormOpen.value = value
  }

  const getCategories = async (): Promise<void> => {
    const respData: any = await httpClient
      .get('/category')
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
        return error
      })

    if (respData?.status === 403) {
      notificationStore.showNotification(
        'Falha ao carregar as categorias. Tente novamente mais tarde!',
        'error'
      )
      return
    }
    categories.value = respData
  }

  const saveProduct = async (data) => {
    const respData = await httpClient
      .post('/product', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }: AxiosResponse) => {
        return data
      })
      .catch((error: AxiosError) => {
        return error
      })

    if (respData?.message) {
      notificationStore.showNotification('Falha ao salvar produto.', 'error')
      return
    }

    isFormOpen.value = false
    notificationStore.showNotification('Produto salvo.', 'success')
  }

  return {
    isFormOpen,
    categories,
    makingCreateRequest,
    setIsFormOpen,
    getCategories,
    saveProduct
  }
})
