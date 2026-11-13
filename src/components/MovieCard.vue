<script setup>
import { posterUrl } from '../api/tmdb'
defineProps({ movie: Object, liked: Boolean })
defineEmits(['toggle'])
</script>

<template>
  <article class="group">
    <div class="relative aspect-2/3 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
      <img
        :src="posterUrl(movie.poster_path)"
        :alt="movie.title"
        loading="lazy"
        class="size-full object-cover transition duration-300 group-hover:scale-105"
      />
      <button
        @click="$emit('toggle', movie)"
        :aria-label="liked ? 'Retirer des favoris' : 'Aimer ce film'"
        class="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 dark:bg-neutral-900/90 shadow-sm transition hover:scale-110"
        :class="liked ? 'text-rose-500' : 'text-neutral-400 hover:text-neutral-900'"
      >
        <svg viewBox="0 0 24 24" class="size-4" :fill="liked ? 'currentColor' : 'none'"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
    <h3 class="mt-2 truncate text-sm font-medium">{{ movie.title }}</h3>
    <p class="text-xs text-neutral-500 dark:text-neutral-400">
      {{ movie.release_date?.slice(0, 4) }}<span v-if="movie.vote_average"> · ★ {{ movie.vote_average.toFixed(1) }}</span>
    </p>
    <p v-if="movie.from" class="mt-1 line-clamp-2 text-xs text-neutral-400 dark:text-neutral-400">
  Recommandé pour le choix : {{ movie.from.join(', ') }}
</p>
  </article>
</template>