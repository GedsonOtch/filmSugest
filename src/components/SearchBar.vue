<script setup>
const query = defineModel({ default: '' })
defineEmits(['submit'])
</script>

<template>
  <form @submit.prevent="$emit('submit')">
    <input
      v-model="query"
      type="search"
      placeholder="Un film que vous aimez…"
      class="w-full border-b border-neutral-300 bg-transparent py-3 text-lg outline-none transition 
      placeholder:text-neutral-400 focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-white dark:placeholder:text-neutral-500"
   
      />
  </form>
</template>