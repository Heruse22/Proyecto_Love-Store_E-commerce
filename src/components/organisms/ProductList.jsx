
import ProductCard from '../molecules/ProductCard'
import Spinner from '../atoms/Spinner'

function ProductList({ productos, onAgregar, cargando, error  }) {


  // Estado de carga
  if (cargando) {
    return <Spinner />
  }

  // Mensaje de error (no bloquea, solo informa)
  const bannerError = error && (
    <div style={{
      backgroundColor: 'var(--rosa-suave)',
      color: 'var(--marron-texto)',
      fontFamily: 'var(--fuente-cuerpo)',
      fontSize: '0.9rem',
      padding: 'var(--espaciado-s) var(--espaciado-l)',
      textAlign: 'center',
      borderBottom: '1px solid var(--rosa-vibrante)',
    }}>
      ⚠️ {error}
    </div>
  )

  if (!productos || productos.length === 0) {
    return (
        <>{bannerError}
      <div style={{
        textAlign: 'center',
        padding: 'var(--espaciado-xl)',
        fontFamily: 'var(--fuente-cuerpo)',
        color: 'var(--marron-texto)',
        opacity: '0.6',
      }}>
        <p style={{ fontSize: '2rem' }}>🕯️</p>
        <p>No se encontraron productos.</p>
      </div>
      </>
    )
  }

  return (

    <>
      {bannerError}

      {/* Contador de resultados */}
      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.85rem',
        color: 'var(--marron-texto)',
        opacity: '0.6',
        padding: '0 var(--espaciado-l)',
        marginTop: 'var(--espaciado-m)',
      }}>
        {productos.length} producto{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
      </p>


    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: 'var(--espaciado-l)',
      padding: 'var(--espaciado-l)',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {productos.map(producto => (
        <ProductCard
          key={producto.id}
          producto={producto}
          onAgregar={onAgregar}
        />
      ))}
    </div>
    </>
  )
}

export default ProductList