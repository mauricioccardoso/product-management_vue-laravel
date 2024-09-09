import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

export const useSidebarControllerStore = defineStore('sidebarControllerStore', () => {
  const isSidebarOpen: Ref<boolean> = ref(false)

  const setIsSidebarOpen = (value: boolean): void => {
    isSidebarOpen.value = value
  }

  return { isSidebarOpen, setIsSidebarOpen }
})
