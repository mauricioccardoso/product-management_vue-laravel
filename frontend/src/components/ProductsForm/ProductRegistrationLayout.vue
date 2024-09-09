<template>
  <div
    v-if="formCreateProductStore.isFormOpen"
    @click="formCreateProductStore.setIsFormOpen(false)"
    class="absolute top-0 left-0 h-full w-full z-10 bg-black opacity-50"
  ></div>

  <div
    v-if="formCreateProductStore.isFormOpen"
    class="absolute top-0 right-0 h-full w-full sm:w-4/6 lg:max-w-4xl z-20 bg-app-bg-secondary"
  >
    <ProductRegistrationForm class="overflow-y-auto" />
  </div>
</template>

<script setup lang="ts">
import { useFormCreateProductStore } from '@/stores/FormCreateProductStore'
import ProductRegistrationForm from './ProductRegistrationForm.vue'

const formCreateProductStore = useFormCreateProductStore()
</script>
