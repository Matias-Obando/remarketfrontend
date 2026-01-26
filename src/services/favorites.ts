export type FavoriteProduct = {
  id: number
  title?: string
  price?: number
  location?: string
  condition?: string
  category?: string
}

const KEY = 'favorites'

function read(): number[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function write(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(ids))
}

export function getFavoriteIds(): number[] {
  return read()
}

export function isFavorite(id: number): boolean {
  return read().includes(id)
}

export function toggleFavorite(id: number): number[] {
  const ids = read()
  const next = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
  write(next)
  return next
}

export function clearFavorites() {
  localStorage.removeItem(KEY)
}
