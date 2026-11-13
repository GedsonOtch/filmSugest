const BASE = '/api/tmdb'

async function get(path, params = {}) {
  const q = new URLSearchParams({ language: 'fr-FR', ...params })
  const res = await fetch(`${BASE}${path}?${q}`)
  if (!res.ok) throw new Error(`TMDB ${res.status}`)
  return res.json()
}

export const searchMovies = (query) =>
  get('/search/movie', { query }).then((d) => d.results)

export const getRecommendations = (id) =>
  get(`/movie/${id}/recommendations`).then((d) => d.results)

export const getGenres = () =>
  get('/genre/movie/list').then((d) => d.genres)

export const posterUrl = (p) =>
  p
    ? `https://image.tmdb.org/t/p/w342${p}`
    : 'https://placehold.co/342x513/f5f5f5/a3a3a3?text=Sans+affiche'