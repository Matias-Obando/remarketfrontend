export type Product = {
  id: number
  title: string
  price: number
  condition: 'Nuevo' | '2ª mano'
  category: string
  location: string
  images: string[] // urls o rutas
}

const KEY = 'products'

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, title: 'iPhone 12', price: 280, condition: '2ª mano', category: 'Tecnología', location: 'Barcelona', images: [] },
  { id: 2, title: 'Zapatillas Nike', price: 45, condition: '2ª mano', category: 'Moda', location: 'Madrid', images: [] },
  { id: 3, title: 'Silla gaming', price: 90, condition: '2ª mano', category: 'Hogar', location: 'Valencia', images: [] },
  { id: 4, title: 'Bicicleta', price: 120, condition: '2ª mano', category: 'Deporte', location: 'Sevilla', images: [] },
  { id: 5, title: 'Auriculares nuevos', price: 25, condition: 'Nuevo', category: 'Tecnología', location: 'Bilbao', images: [] },
  { id: 6, title: 'Chaqueta', price: 30, condition: 'Nuevo', category: 'Moda', location: 'Zaragoza', images: [] },
]

function read(): Product[] {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
  try {
    return JSON.parse(raw) as Product[]
  } catch {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
}

function write(products: Product[]) {
  localStorage.setItem(KEY, JSON.stringify(products))
}

export function getProducts(): Product[] {
  return read()
}

export function addProduct(p: Omit<Product, 'id'>): Product {
  const products = read()
  const newProduct: Product = { id: Date.now(), ...p }
  write([newProduct, ...products])
  return newProduct
}

export function getProductById(id: number): Product | undefined {
  return read().find(p => p.id === id)
}
