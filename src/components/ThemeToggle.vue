<script setup>
import { useTheme } from '../composables/useTheme'
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    class="grid size-9 place-items-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
  >
    <!-- Soleil -->
    <svg v-if="isDark" viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
    <!-- Lune -->
    <svg v-else viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  </button>
</template>