<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { searchMovies, getRecommendations, getGenres } from './api/tmdb'
import { useLikes } from './composables/useLikes'
import SearchBar from './components/SearchBar.vue'
import FilterBar from './components/FilterBar.vue'
import MovieCard from './components/MovieCard.vue'
import ThemeToggle from './components/ThemeToggle.vue'
const { liked, isLiked, toggle } = useLikes()

const query = ref('')
const results = ref([])
const recos = ref([])
const genres = ref([])
const loading = ref(false)
const filters = reactive({ genre: null, minRating: 0, sort: 'relevance' })

onMounted(async () => {
  genres.value = await getGenres()
})

async function search() {
  if (!query.value.trim()) return (results.value = [])
  results.value = (await searchMovies(query.value)).slice(0, 10)
}

async function loadRecos() {
  if (!liked.value.length) return (recos.value = [])
  loading.value = true
  const snapshot = [...liked.value]
  const lists = await Promise.all(snapshot.map((m) => getRecommendations(m.id)))
  const scores = new Map()
  lists.forEach((list, i) =>
    list.forEach((m) => {
      if (isLiked(m.id)) return
      const e = scores.get(m.id) || { movie: m, count: 0, from: [] }
      e.count++
      e.from.push(snapshot[i].title)
      scores.set(m.id, e)
    })
  )
  recos.value = [...scores.values()]
    .sort((a, b) => b.count - a.count || b.movie.vote_average - a.movie.vote_average)
    .slice(0, 40)
    .map((e) => ({ ...e.movie, from: e.from }))
  loading.value = false
}

watch(liked, loadRecos, { deep: true, immediate: true })

const filteredRecos = computed(() => {
  let list = recos.value.filter(
    (m) =>
      (!filters.genre || m.genre_ids.includes(filters.genre)) &&
      m.vote_average >= filters.minRating
  )
  if (filters.sort === 'rating')
    list = [...list].sort((a, b) => b.vote_average - a.vote_average)
  if (filters.sort === 'recent')
    list = [...list].sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))
  return list
})

const label = 'mb-4 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400'
const grid = 'grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-5'
</script>

<template>
  <main class="mx-auto max-w-5xl space-y-14 px-6 py-12">
   <header class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-semibold tracking-tight">Que regarder ce soir ?</h1>
      <ThemeToggle />
    </div>
    <SearchBar v-model="query" @submit="search" />
  </header>

    <section v-if="results.length">
      <div class="flex items-baseline justify-between">
        <h2 :class="label">Résultats</h2>
        <button @click="results = []" class="text-sm text-neutral-500 dark:text-neutral-400 dark:hover:text-white hover:text-neutral-900">
          Effacer
        </button>
      </div>
      <div :class="grid">
        <MovieCard v-for="m in results" :key="m.id" :movie="m"
          :liked="isLiked(m.id)" @toggle="toggle" />
      </div>
    </section>

    <section v-if="liked.length">
      <h2 :class="label">Vos films aimés · {{ liked.length }}</h2>
      <div class="flex gap-4 overflow-x-auto pb-2">
        <div v-for="m in liked" :key="m.id" class="w-28 shrink-0">
          <MovieCard :movie="m" :liked="true" @toggle="toggle" />
        </div>
      </div>
    </section>

    <section>
      <h2 :class="label">Recommandations</h2>
      <p v-if="!liked.length" class="text-neutral-500 dark:text-neutral-400">
        Recherchez un film et aimez-le pour obtenir des suggestions.
      </p>
      <template v-else>
        <FilterBar v-model="filters" :genres="genres" class="mb-6" />
        <p v-if="loading" class="text-neutral-500 dark:text-neutral-400">Chargement…</p>
        <p v-else-if="!filteredRecos.length" class="text-neutral-500 dark:text-neutral-400">
          Aucun film ne correspond à ces filtres.
        </p>
        <div v-else :class="grid">
          <MovieCard v-for="m in filteredRecos" :key="m.id" :movie="m"
            :liked="isLiked(m.id)" @toggle="toggle" />
        </div>
      </template>
    </section>
  </main>
</template>