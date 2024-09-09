<template>
  <div class="card bg-white shadow-md rounded-lg p-2 m-1 my-3 max-w-sm text-center">
    <h1 class="title is-6 mb-2">{{ productData?.name }}</h1>
    <figure class="image is-square" style="margin: auto; width: 128px; height: 128px">
      <img
        :src="`${baseURLImage}storage/${productData?.image_url}`"
        alt="Product Image"
        style="object-fit: cover; width: 100%; height: 100%"
      />
    </figure>
    <p class="tag">{{ productData?.description }}</p>
    <p>Preço: {{ priceFormated }}</p>
    <p class="tag">Validade: {{ dateFormated }}</p>
    <p class="tag">Categoria: {{ productData?.category.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { baseURLImage } from '@/http'

const props = defineProps({
  productData: {
    type: Object,
    required: true
  }
})

const date = new Date(props.productData.expiration_date)

const dateFormated = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}).format(date)

const priceFormated = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(props.productData.price)
</script>

<style scoped>
.card:hover {
  background-color: #e0e0e046;
}
</style>
