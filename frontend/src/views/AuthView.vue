<script setup lang="ts">
import IRedeLogo from '@/components/img/IRedeLogo.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="h-screen bg-app-bg-primary">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <IRedeLogo class="mx-auto md:w-60 w-auto" />
      </div>

      <div class="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <!-- Login / Registration form -->
        <RouterView />
      </div>
    </div>
  </main>
</template>
