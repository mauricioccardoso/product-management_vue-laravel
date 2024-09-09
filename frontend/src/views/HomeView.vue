<template>
  <div class="flex min-h-screen bg-app-bg-secondary">
    <SideBar />

    <RouterView />
  </div>
</template>

<script setup>
import SideBar from '@/components/MainView/SideBar.vue'
import { useUserDataStore } from '@/stores/UserDataStore'

const userDataStore = useUserDataStore()
</script>
