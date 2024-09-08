<template>
  Hello World

  <p>{{ userDataStore.userData }}</p>
</template>

<script setup>
import { useUserDataStore } from '@/stores/UserDataStore'

const userDataStore = useUserDataStore()
</script>
