
import ProductCard from '../molecules/ProductCard'

function ProductList({ productos, onAgregar }) {

  if (!productos || productos.length === 0) {
    return (
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
    )
  }

  return (
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
  )
}

export default ProductList