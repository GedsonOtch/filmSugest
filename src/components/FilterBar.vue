<script setup>
defineProps({ genres: Array })
const filters = defineModel({ required: true })

const reset = () =>
  Object.assign(filters.value, { genre: null, minRating: 0, sort: 'relevance' })

const select =
  'rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm outline-none transition hover:border-neutral-400 focus:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600 dark:focus:border-white dark:text-white'
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <select v-model="filters.genre" :class="select">
      <option :value="null">Tous les genres</option>
      <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
    </select>

    <select v-model.number="filters.minRating" :class="select">
      <option :value="0">Toutes les notes</option>
      <option :value="6">6+</option>
      <option :value="7">7+</option>
      <option :value="8">8+</option>
    </select>

    <select v-model="filters.sort" :class="select">
      <option value="relevance">Pertinence</option>
      <option value="rating">Mieux notés</option>
      <option value="recent">Plus récents</option>
    </select>

    <button @click="reset" class="px-2 text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
      Réinitialiser
    </button>
  </div>
</template>