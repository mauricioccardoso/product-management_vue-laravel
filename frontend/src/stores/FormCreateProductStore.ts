import httpClient from '@/http'
import { useNotificationStore } from '@/stores/NotificationStore'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useFormCreateProductStore = defineStore('formCreateProductStore', () => {
  const notificationStore = useNotificationStore()

  const isFormOpen: Ref<boolean> = ref(false)
  const makingCreateRequest = ref(false)

  const categories: Ref<[]> = ref([])

  const setIsFormOpen = (value): void => {
    isFormOpen.value = value
  }

  const getCategories = async (): Promise<void> => {
    if (categories.value.length !== 0) {
      return
    }
    const respData: any = await httpClient.get('/categories')

    if (respData?.code) {
      notificationStore.showNotification(
        'Falha ao carregar as categorias. Tente novamente mais tarde!',
        'error'
      )
      return
    }

    categories.value = respData.map((category) => ({
      id: category.id,
      title: category.name
    }))
  }

  return {
    isFormOpen,
    categories,
    makingCreateRequest,
    setIsFormOpen,
    getCategories
  }
})
