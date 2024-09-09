<template>
  <div class="absolute z-50 top-0 right-0 sm:top-4 sm:right-4 w-full sm:w-fit">
    <div class="bg-neutral-50 shadow-xl rounded-b-lg sm:rounded-md p-4">
      <div class="flex justify-between">
        <div class="p-1">
          <SuccessIcon v-if="notificationStore.notification?.type === 'success'" />
          <InfoIcon v-if="notificationStore.notification?.type === 'info'" />
          <WarningIcon v-if="notificationStore.notification?.type === 'warning'" />
          <ErrorIcon v-if="notificationStore.notification?.type === 'error'" />
        </div>

        <div v-if="typeof notificationStore.notification.message === 'string'" class="p-1">
          <p class="font-semibold">{{ notificationStore.notification?.message }}</p>
        </div>

        <div v-else class="p-1">
          <span
            v-for="message in notificationStore?.notification?.message"
            :key="message"
            class="block font-semibold"
          >
            {{ message }}
          </span>
        </div>

        <div class="p-1 rounded">
          <button
            @click="notificationStore.clearNotificationData()"
            type="button"
            class="px-1 ring-3 text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              class="h-4 w-4 inline-block"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import SuccessIcon from '@/components/icons/SuccessIcon.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'

import { useNotificationStore } from '@/stores/NotificationStore'

const notificationStore = useNotificationStore()
</script>
