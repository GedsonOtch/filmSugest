import { ref, watch } from 'vue'

const liked = ref(JSON.parse(localStorage.getItem('liked') || '[]'))
watch(liked, (v) => localStorage.setItem('liked', JSON.stringify(v)), { deep: true })

export function useLikes() {
  const isLiked = (id) => liked.value.some((m) => m.id === id)

  const toggle = (m) => {
    if (isLiked(m.id)) {
      liked.value = liked.value.filter((x) => x.id !== m.id)
    } else {
      const { id, title, poster_path, release_date, vote_average } = m
      liked.value.push({ id, title, poster_path, release_date, vote_average })
    }
  }

  return { liked, isLiked, toggle }
}