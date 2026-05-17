import { useEffect, useState } from 'react'
import MainLayout from './components/templates/MainLayout'
import ProductList from './components/organisms/ProductList'
import SearchBar from './components/molecules/SearchBar'
import Cart from './components/organisms/Cart'
import useProductStore from './store/productStore'
import useCartStore from './store/cartStore'

function App() {

    const [carritoAbierto, setCarritoAbierto] = useState(false)
    
    const busqueda = useProductStore(state => state.busqueda)
    const setBusqueda = useProductStore(state => state.setBusqueda)
    const cargando = useProductStore(state => state.cargando)
    const error = useProductStore(state => state.error)
    const cargarProductos = useProductStore(state => state.cargarProductos)
    const getProductosFiltrados = useProductStore(
    state => state.getProductosFiltrados)

    

    const agregarItem = useCartStore(state => state.agregarItem)

    useEffect(() => {
    cargarProductos()
    }, [])

    const productosFiltrados = getProductosFiltrados()

    const handleAgregarItem = (producto) => {
    agregarItem(producto)
    setCarritoAbierto(true)   // Abre el carrito al agregar un producto
        }

    // const totalItems = useCartStore(
    // state => state.items.reduce((total, item) => total + item.cantidad, 0)
    //     )
    

  return (
    <MainLayout onAbrirCarrito={() => setCarritoAbierto(true)}>

      {/* Barra de búsqueda */}
      <div style={{
        padding: 'var(--espaciado-m) var(--espaciado-l)',
        backgroundColor: 'var(--crema-claro)',
        borderBottom: '1px solid var(--beige-fondo)',
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
        />
      </div>

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