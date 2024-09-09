<template>
  <div class="min-h-screen w-full p-5">
    <HeaderMain />
    <ProductRegistrationLayout />

    <main class="w-full bg-gray-200 mt-5 rounded-lg">
      <div class="card-container flex flex-wrap justify-center gap-4">
        <ProductCard v-for="product in products" :key="product.id" :productData="product" />
      </div>
    </main>
  </div>
</template>
<script setup>
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import ProductRegistrationLayout from '@/components/ProductsForm/ProductRegistrationLayout.vue'
import HeaderMain from '@/components/ProductsView/HeaderMain.vue'
import { useProductsStore } from '@/stores/ProductsStore'
import { onMounted, ref } from 'vue'

const productsStore = useProductsStore()

const products = ref()

onMounted(async () => {
  await productsStore.getProducts()
  products.value = productsStore.productsPaginated.data
  console.log(products)
})
</script>

<style scoped>
main {
  height: calc(100% - 68px);
}
</style>
