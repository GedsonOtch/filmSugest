import express from 'express'

const app = express()
const KEY = process.env.TMDB_KEY

const ALLOWED = [
  /^\/search\/movie$/,
  /^\/movie\/\d+\/recommendations$/,
  /^\/genre\/movie\/list$/,
]

app.use('/api/tmdb', async (req, res) => {
  if (req.method !== 'GET' || !ALLOWED.some((r) => r.test(req.path))) {
    return res.status(403).json({ error: 'Route interdite' })
  }
  try {
    const params = new URLSearchParams(req.query)
    params.set('api_key', KEY)
    const r = await fetch(`https://api.themoviedb.org/3${req.path}?${params}`)
    res.status(r.status).json(await r.json())
  } catch {
    res.status(502).json({ error: 'TMDB injoignable' })
  }
})

app.use(express.static('dist'))
app.listen(3001, () => console.log('Proxy sur :3001'))