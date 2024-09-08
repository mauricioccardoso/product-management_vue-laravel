import type { IUserData } from '@/interfaces/IUserData'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useUserDataStore = defineStore('userDataStore', () => {
  const userData: Ref<IUserData> = ref({})

  const setUserData = (data: IUserData): void => {
    userData.value = { ...data }
  }

  const clear = (): void => {
    delete userData.value.id
    delete userData.value.name
    delete userData.value.email
    delete userData.value.role?.id
    delete userData.value.role?.name
  }

  return { userData, setUserData, clear }
})
