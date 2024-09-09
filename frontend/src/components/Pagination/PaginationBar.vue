<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <button @click="fetchItems(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
    <button @click="fetchItems(currentPage + 1)" :disabled="currentPage === lastPage">
      Próximo
    </button>
  </div>
</template>
