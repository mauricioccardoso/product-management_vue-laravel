<template>
  <form class="flex flex-col justify-between h-full w-full text-app-label-primary p-10 pt-10">
    <div>
      <!-- Title -->
      <span class="text-2xl font-bold"> Cadastrar Produto </span>
      <div class="grid md:grid-cols-4 gap-x-5 gap-y-1 2xl:gap-y-4 text-sm mt-4"></div>
    </div>

    <div class="flex justify-center mt-4">
      <FormButton
        @click="cancelCreate"
        label="Cancelar"
        type="button"
        class="bg-gray-200 text-app-label-primary mr-5"
      />
      <FormButton
        label="Cadastrar Produto"
        type="submit"
        :isLoading="formCreateProductStore.makingCreateRequest"
        class="text-white bg-app-label-primary"
        customClasses="hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useFormCreateProductStore } from '@/stores/FormCreateProductStore'
import FormButton from './FormButton.vue'

const formCreateProductStore = useFormCreateProductStore()

const cancelCreate = () => {
  formCreateProductStore.setIsFormOpen(false)
}
</script>
