<template>
  <RouterLink
      :to="path"
      @click="cbFunction"
      :class="computedClasses"
      class="flex items-center w-full mt-3 px-4 py-2 rounded-md shadow-sm">

    <slot></slot>

  </RouterLink>
</template>

<script setup lang="ts">

import { computed } from "vue";

const props = defineProps<{
  path : { name : string }
  customClasses? : string
  cbFunction? : Function
}>()

const computedClasses = computed(() => {
  const defaultClasses = 'bg-app-bg-secondary text-app-label-primary font-semibold hover:text-blue-700 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 focus-visible:text-blue-700';
  if(props.customClasses) {
    return props.customClasses;
  }
  return defaultClasses;
});


</script>