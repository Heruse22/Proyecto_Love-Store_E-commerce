
import { create } from 'zustand'
import MOCK_PRODUCTS from '../mockdata/products'
import { obtenerProductos } from '../services/productService'

const useProductStore = create((set, get) => ({

  productos: [],   // Lista completa de productos
  busqueda: '',               // Término de búsqueda activo
  categoriaActiva: 'todas',   // Categoría seleccionada
  cargando: false,            // Estado de carga para la API
  error: null,                // Mensaje de error si la API falla

  setBusqueda: (termino) => set({ busqueda: termino }),

  setCategoriaActiva: (categoria) => set({ categoriaActiva: categoria }),

   // Carga productos desde FakeStore API
  // Si falla, usa mockdata de Love Store como respaldo
  cargarProductos: async () => {
    set({ cargando: true, error: null })

    try {
      const productosAPI = await obtenerProductos()
      set({ productos: productosAPI, cargando: false })

    } catch (error) {
      console.warn('API no disponible, usando mockdata Love Store:', error)
      set({
        productos: MOCK_PRODUCTS,
        cargando: false,
        error: 'No se pudo conectar a la API. Mostrando catálogo local.'
      })
    }
  },


  // Combina búsqueda + categoría para devolver
  // solo los productos que coincidan con ambos filtros
  getProductosFiltrados: () => {
    const { productos, busqueda, categoriaActiva } = get()

    return productos.filter(producto => {

      // Filtro por texto (nombre o descripción)
      const nombre = (producto.nombre || producto.title || '').toLowerCase()
      const descripcion = (producto.descripcion || producto.description || '').toLowerCase()
      const terminoLower = busqueda.toLowerCase()
      const coincideTexto = nombre.includes(terminoLower) ||
                            descripcion.includes(terminoLower)

      // Filtro por categoría
      const categoria = producto.categoria || producto.category || ''
      const coincideCategoria = categoriaActiva === 'todas' ||
                                categoria === categoriaActiva

      return coincideTexto && coincideCategoria
    })
  }
}))

export default useProductStore