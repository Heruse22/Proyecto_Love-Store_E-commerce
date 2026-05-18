import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from './components/templates/MainLayout'
import ProductList from './components/organisms/ProductList'
import Paginacion from './components/organisms/Paginacion'
import SearchBar from './components/molecules/SearchBar'
import CategoryFilter from './components/molecules/CategoryFilter'
import Cart from './components/organisms/Cart'
import ResultadosBusqueda from './components/atoms/ResultadosBusqueda'
import useProductStore from './store/productStore'
import useCartStore from './store/cartStore'
import useDebounce from './hooks/useDebounce'
import usePaginacion from './hooks/usePaginacion'
import useResponsive from './hooks/useResponsive'


function App() {

    const navigate = useNavigate()
    const { esMovil, esTablet } = useResponsive()
    const [carritoAbierto, setCarritoAbierto] = useState(false)
    const productos = useProductStore(state => state.productos)
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

    const busquedaDebounced = useDebounce(busqueda, 250)

    useEffect(() => {
    cargarProductos()
    }, [])

    const productosFiltrados = useMemo(() => {
         return productos.filter(producto => {

     const nombre = (producto.nombre || producto.title || '').toLowerCase()
      const descripcion = (
        producto.descripcion || producto.description || ''
      ).toLowerCase()
      const terminoLower = busquedaDebounced.toLowerCase()

      const coincideTexto =
        nombre.includes(terminoLower) ||
        descripcion.includes(terminoLower)

      const categoria = producto.categoria || producto.category || ''
      const coincideCategoria =
        categoriaActiva === 'todas' || categoria === categoriaActiva

      return coincideTexto && coincideCategoria
      })
        }, [productos, busquedaDebounced, categoriaActiva])



    const productosPorPagina = esMovil ? 4 : esTablet ? 6 : 6
    const paginacion = usePaginacion(productosFiltrados, productosPorPagina)

    const handleAgregarItem = (producto) => {
    agregarItem(producto)
    setCarritoAbierto(true)   // Abre el carrito al agregar un producto
        }

  return (
    <MainLayout onAbrirCarrito={() => setCarritoAbierto(true)}>

      {/* Barra de búsqueda */}
      <div style={{
       padding: esMovil
          ? 'var(--espaciado-m)'
          : 'var(--espaciado-m) var(--espaciado-l)',
        backgroundColor: 'var(--crema-claro)',
        borderBottom: '1px solid var(--beige-fondo)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--espaciado-m)',
      }}>


        {/* Título + SearchBar */}
        <div style={{
          display: 'flex',
          flexDirection: esMovil ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: esMovil ? 'flex-start' : 'center',
          flexWrap: 'wrap',
          gap: 'var(--espaciado-m)',
        }}>

        <h2 style={{
            fontFamily: 'var(--fuente-titulo)',
            fontSize: esMovil ? '1.3rem' : '1.6rem',
            color: 'var(--marron-texto)',
          }}>
            Catálogo Mes de las Madres 🌸
          </h2>
          <div style={{ width: esMovil ? '100%' : 'auto' }}>
            <SearchBar
              valor={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              onLimpiar={limpiarFiltros}
            />
          </div>
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

       {/* ── Galería paginada ── */}
      <ProductList
        productos={paginacion.itemsPaginaActual}
        onAgregar={handleAgregarItem}
        cargando={cargando}
        error={error}
      />

      {/* ── Controles de paginación ── */}
      <Paginacion
        paginaActual={paginacion.paginaActual}
        totalPaginas={paginacion.totalPaginas}
        irAPagina={paginacion.irAPagina}
        irAnterior={paginacion.irAnterior}
        irSiguiente={paginacion.irSiguiente}
        hayAnterior={paginacion.hayAnterior}
        haySiguiente={paginacion.haySiguiente}
        indiceInicio={paginacion.indiceInicio}
        indiceFin={paginacion.indiceFin}
        totalItems={paginacion.totalItems}
      />
      

       {/* Panel lateral del carrito */}
      {carritoAbierto && (
        <Cart
          onCerrar={() => setCarritoAbierto(false)}
          onCheckout={() => {
            setCarritoAbierto(false)
            navigate('/checkout')
          }}
        />
      )}

    </MainLayout>
  )
}

export default App