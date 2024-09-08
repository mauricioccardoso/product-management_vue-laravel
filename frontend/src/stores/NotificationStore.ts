import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

interface INotification {
  message?: Array<string> | string
  type?: string
}

export const useNotificationStore = defineStore('notificationStore', () => {
  const notification: Ref<INotification> = ref({})
  let timeoutId: NodeJS.Timeout | null = null

  const showNotification = (message: Array<string> | string, type: string): void => {
    clearNotificationTimeOut()

    notification.value.message = message
    notification.value.type = type

    timeoutId = setTimeout(() => {
      clearNotificationData()
    }, 3000)
  }

  const clearNotificationTimeOut = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      clearNotificationData()
    }
  }

  const clearNotificationData = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    delete notification.value.message
    delete notification.value.type
  }

  return { notification, showNotification, clearNotificationData }
})
