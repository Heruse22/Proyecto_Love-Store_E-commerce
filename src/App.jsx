import { useEffect, useState } from 'react'
import MainLayout from './components/templates/MainLayout'
import ProductList from './components/organisms/ProductList'
import SearchBar from './components/molecules/SearchBar'
import CategoryFilter from './components/molecules/CategoryFilter'
import Cart from './components/organisms/Cart'
import ResultadosBusqueda from './components/atoms/ResultadosBusqueda'
import useProductStore from './store/productStore'
import useCartStore from './store/cartStore'
import useDebounce from './hooks/useDebounce'

function App() {

    const [carritoAbierto, setCarritoAbierto] = useState(false)
    
    const busqueda = useProductStore(state => state.busqueda)
    const setBusqueda = useProductStore(state => state.setBusqueda)
    const categoriaActiva = useProductStore(state => state.categoriaActiva)
    const setCategoriaActiva = useProductStore(state => state.setCategoriaActiva)
    const limpiarFiltros = useProductStore(state => state.limpiarFiltros)
    const cargando = useProductStore(state => state.cargando)
    const error = useProductStore(state => state.error)
    const cargarProductos = useProductStore(state => state.cargarProductos)
    const getProductosFiltrados = useProductStore(
    state => state.getProductosFiltrados)

    

    const agregarItem = useCartStore(state => state.agregarItem)

    const busquedaDebounced = useDebounce(busqueda, 350)

    useEffect(() => {
    cargarProductos()
    }, [])

    const productosFiltrados = getProductosFiltrados()

    const handleAgregarItem = (producto) => {
    agregarItem(producto)
    setCarritoAbierto(true)   // Abre el carrito al agregar un producto
        }

  return (
    <MainLayout onAbrirCarrito={() => setCarritoAbierto(true)}>

      {/* Barra de búsqueda */}
      <div style={{
        padding: 'var(--espaciado-m) var(--espaciado-l)',
        backgroundColor: 'var(--crema-claro)',
        borderBottom: '1px solid var(--beige-fondo)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--espaciado-m)',
      }}>


        {/* Título + SearchBar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--espaciado-m)',
        }}>

        <h2 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.6rem',
          color: 'var(--marron-texto)',
        }}>
          Catálogo Mes de las Madres 🌸
        </h2>
        <SearchBar
          valor={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            onLimpiar={limpiarFiltros}
        />
      </div>

          {/* Filtros de categoría */}
        <CategoryFilter
          categoriaActiva={categoriaActiva}
          onCambiar={setCategoriaActiva}
        />

      </div>

      {/* ── Contador de resultados ── */}
      <ResultadosBusqueda
        total={productosFiltrados.length}
        busqueda={busquedaDebounced}
        categoria={categoriaActiva}
      />

      {/* Galería de productos */}
      <ProductList
        productos={productosFiltrados}
        onAgregar={handleAgregarItem}
        cargando={cargando}
        error={error}
      />
      

       {/* Panel lateral del carrito */}
      {carritoAbierto && (
        <Cart
          onCerrar={() => setCarritoAbierto(false)}
          onCheckout={() => {
            setCarritoAbierto(false)
            alert('🛒 Checkout próximamente — Paso 11')
          }}
        />
      )}

    </MainLayout>
  )
}

export default App