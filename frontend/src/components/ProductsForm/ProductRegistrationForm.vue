<template>
  <form
    @submit.prevent="saveProduct"
    class="flex flex-col justify-between h-full w-full text-app-label-primary p-10 pt-10"
  >
    <div>
      <!-- Title -->
      <span class="text-2xl font-bold"> Cadastrar Produto </span>

      <div class="grid md:grid-cols-4 gap-x-5 gap-y-1 2xl:gap-y-4 text-sm mt-4">
        <!-- name -->
        <div class="col-span-2">
          <label for="name" class="block leading-6"> Nome </label>
          <div>
            <input
              v-model="formData.name"
              required
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- description -->
        <div class="col-span-2">
          <label for="description" class="block leading-6"> Descrição </label>
          <div>
            <input
              v-model="formData.description"
              required
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- price -->
        <div class="col-span-2">
          <label for="price" class="block leading-6"> Preço </label>
          <div>
            <input
              required
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="formattedValue"
              @input="formatCurrency"
              id="price"
              type="text"
            />
          </div>
        </div>

        <!-- date -->
        <div class="col-span-2">
          <label for="date" class="block leading-6"> Data </label>
          <div>
            <input
              required
              v-model="formData.date"
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-9"
              id="date"
              type="date"
            />
          </div>
        </div>

        <!-- image -->
        <div class="col-span-2">
          <label for="image" class="block leading-6"> Imagem </label>
          <div>
            <input
              required
              ref="imageInput"
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="image"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
            />
          </div>
        </div>

        <!-- Category -->
        <div class="col-span-2">
          <label for="category" class="block leading-6"> Categoria </label>
          <div>
            <select
              required
              v-model="formData.category"
              class="block w-full rounded-md border-0 p-1.5 pl-4 outline-0 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-10"
              id="category"
            >
              <option value="">Selecione uma categoria</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
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
import { ICreateProduct } from '@/interfaces/ICreateProduct'
import { useFormCreateProductStore } from '@/stores/FormCreateProductStore'
import { computed, onMounted, Ref, ref } from 'vue'
import FormButton from './FormButton.vue'

const formCreateProductStore = useFormCreateProductStore()

const cancelCreate = () => {
  formCreateProductStore.setIsFormOpen(false)
}
let categories = ref([])

onMounted(async () => {
  await formCreateProductStore.getCategories()
  categories.value = formCreateProductStore.categories
})

const value = ref('')
const formattedValue = computed({
  get: () => value.value,
  set: (val) => {
    value.value = val.replace(/\D/g, '')
  }
})

const formatCurrency = () => {
  value.value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(parseFloat(value.value) / 100)
}

const formData: Ref<ICreateProduct> = ref({})

const imageInput = ref<HTMLInputElement | null>(null)

const saveProduct = async () => {
  if (!imageInput.value || !imageInput.value.files?.[0]) {
    console.error('Imagem não selecionada')
    return
  }

  const formDataToSend = new FormData()
  formDataToSend.append('name', formData.value.name || '')
  formDataToSend.append('description', formData.value.description || '')
  formDataToSend.append('price', value.value.slice(3).replace('.', '').replace(',', '.') || '')
  formDataToSend.append('expiration_date', formData.value.date || '')
  formDataToSend.append('category_id', formData.value.category || '')
  formDataToSend.append('image', imageInput.value.files[0])

  await formCreateProductStore.saveProduct(formDataToSend)

  console.log(formCreateProductStore.errors)
}
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
