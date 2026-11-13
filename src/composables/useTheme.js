import { ref } from 'vue'

const isDark = ref(document.documentElement.classList.contains('dark'))

function apply(dark) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  isDark.value = dark
}

export function useTheme() {
  async function toggle(event) {
    const dark = !isDark.value
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!document.startViewTransition || reduce) return apply(dark)

    // Le cercle part du centre du bouton (fonctionne aussi au clavier)
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(() => apply(dark))
    await transition.ready

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 600,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return { isDark, toggle }
}