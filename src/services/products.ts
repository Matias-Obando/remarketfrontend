import iPhone1 from '@/assets/iphone12.png'
import iPhone2 from '@/assets/iphone12f2.png'
import iPhone3 from '@/assets/iphone12f3.png'
import Zapatilla1 from '@/assets/zapatillanikef1.png'
import Zapatilla2 from '@/assets/zapatillanikef2.png'
import Zapatilla3 from '@/assets/zapatillanikef3.png'
import Silla1 from '@/assets/sillaf1.png'
import Silla2 from '@/assets/sillaf2.png'
import Silla3 from '@/assets/sillaf3.png'
import Bici1 from '@/assets/bicicletaf1.png'
import Bici2 from '@/assets/bicicletaf2.png'
import Bici3 from '@/assets/bicicletaf3.png'
import Auri1 from '@/assets/auricularesf1.png'
import Auri2 from '@/assets/auricularesf2.png'
import Auri3 from '@/assets/auricularesf3.png'
import Chaqueta1 from '@/assets/chaquetaf1.png'
import Chaqueta2 from '@/assets/chaquetaf2.png'
import Camiseta1 from '@/assets/camisetarealf1.png'
import Camiseta2 from '@/assets/camisetarealf2.png'

export type Product = {
  id: number
  title: string
  price: number
  condition: 'Nuevo' | '2ª mano'
  category: string
  location: string
  images: string[]
  description:string
}

const KEY = 'products'

const DEFAULT_PRODUCTS: Product[] = [
  { 
    id: 1, 
    title: 'iPhone 12', 
    price: 280, 
    condition: '2ª mano', 
    category: 'Tecnología', 
    location: 'Barcelona', 
    images: [iPhone1, iPhone2, iPhone3],
    description: 'iPhone 12 en excelente estado. Pantalla sin arañazos, batería con buen rendimiento. Incluye cargador original.'
  },
  { 
    id: 2, 
    title: 'Zapatillas Nike', 
    price: 45, 
    condition: '2ª mano', 
    category: 'Moda', 
    location: 'Madrid', 
    images: [Zapatilla1, Zapatilla2, Zapatilla3],
    description: 'Zapatillas Nike modelo Air Max. Poco uso, solo 2-3 veces. Talla 42. Incluye caja original.'
  },
  { 
    id: 3, 
    title: 'Silla gaming', 
    price: 90, 
    condition: '2ª mano', 
    category: 'Hogar', 
    location: 'Valencia', 
    images: [Silla1, Silla2, Silla3],
    description: 'Silla gaming ergonómica con respaldo ajustable. Ruedas de calidad, soporte lumbar. Perfecta para largas sesiones.'
  },
  { 
    id: 4, 
    title: 'Bicicleta', 
    price: 120, 
    condition: '2ª mano', 
    category: 'Deporte', 
    location: 'Sevilla', 
    images: [Bici1, Bici2, Bici3],
    description: 'Bicicleta de montaña 26 pulgadas. 21 cambios Shimano. Frenos de disco. Bien mantenida, lista para rodar.'
  },
  { 
    id: 5, 
    title: 'Auriculares nuevos', 
    price: 25, 
    condition: 'Nuevo', 
    category: 'Tecnología', 
    location: 'Bilbao', 
    images: [Auri1, Auri2, Auri3],
    description: 'Auriculares inalámbricos con cancelación de ruido activa. Batería de 30 horas. Micrófono integrado. Nuevos sin abrir.'
  },
  { 
    id: 6, 
    title: 'Chaqueta adidas', 
    price: 30, 
    condition: 'Nuevo', 
    category: 'Moda', 
    location: 'Zaragoza', 
    images: [Chaqueta1, Chaqueta2],
    description: 'Chaqueta deportiva impermeable Adidas. Talla M. Material transpirable con forro térmico. Perfecta para otoño e invierno.'
  },
  { 
    id: 7, 
    title: 'camiseta Real madrid', 
    price: 30, 
    condition: 'Nuevo', 
    category: 'Moda', 
    location: 'Barcelona', 
    images: [Camiseta1, Camiseta2],
    description: 'Camiseta oficial Real Madrid temporada 2024. Talla L. Material de calidad, oficial del club. Nueva sin usar.'
  },
  
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