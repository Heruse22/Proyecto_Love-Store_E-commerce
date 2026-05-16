import MainLayout from './components/templates/MainLayout'
import ProductList from './components/organisms/ProductList'
import SearchBar from './components/molecules/SearchBar'
import MOCK_PRODUCTS from './mockdata/products'
import CATEGORIAS from './mockdata/categories'
import { useState } from 'react'

function App() {
    const [busqueda, setBusqueda] = useState('')
    const [carrito, setCarrito] = useState([])

    const agregarAlCarrito = (producto) => {
        setCarrito(prev => [...prev, producto])
        alert(`✅ "${productos.nombre || producto.title}" agregado al carrito.`)
    }

    const productosFiltrados = MOCK_PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  return (
    <MainLayout totalItemsCarrito={carrito.length}>

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
        onAgregar={agregarAlCarrito}
      />

    </MainLayout>
  )
}

export default App