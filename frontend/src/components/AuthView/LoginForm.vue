<template>
  <form class="text-white" @submit.prevent="login">
    <div>
      <label for="email" class="block text-sm font-medium leading-6">E-mail</label>
      <div class="mt-1">
        <input
          v-model="formData.email"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div class="mt-3">
      <label for="password" class="block text-sm font-medium leading-6">Senha</label>
      <div class="mt-1">
        <input
          v-model="formData.password"
          id="password"
          name="password"
          type="password"
          required
          class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div class="mt-6">
      <button
        :disabled="authDataStore.makingLoginRequest"
        :class="{ 'cursor-progress': authDataStore.makingLoginRequest }"
        type="submit"
        class="flex w-full justify-center rounded-md bg-app-label-secondary px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span v-if="!authDataStore.makingLoginRequest">Entrar</span>
        <SpinnerIcon v-else />
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import { useAuthDataStore } from '@/stores/AuthDataStore'
import { ref } from 'vue'

const authDataStore = useAuthDataStore()

const formData = ref({
  email: '',
  password: ''
})

const login = () => {
  authDataStore.login(formData.value)
}
</script>
