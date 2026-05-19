
import ProductCard from '../molecules/ProductCard'
import Spinner from '../atoms/Spinner'
import useResponsive from '../../hooks/useResponsive'

function ProductList({ productos, onAgregar, cargando, error  }) {
    const { esMovil, esTablet } = useResponsive()
    const columnas = esMovil ? 1 : esTablet ? 2 : 3

  // Estado de carga
  if (cargando) {
    return <Spinner />
  }

   if (error && (!productos || productos.length === 0)) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--espaciado-xl)',
        gap: 'var(--espaciado-m)',
        textAlign: 'center',
      }}>

        {/* Ícono */}
        <span style={{ fontSize: '3rem' }}>🕯️</span>

        {/* Título del error */}
        <h3 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.5rem',
          color: 'var(--marron-texto)',
        }}>
          Los productos no están disponibles ahora
        </h3>

        {/* Mensaje amigable */}
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.92rem',
          color: 'var(--marron-texto)',
          opacity: '0.65',
          maxWidth: '380px',
          lineHeight: '1.6',
        }}>
          Estamos teniendo problemas para cargar el catálogo.
          Por favor espera un momento e intenta de nuevo.
        </p>

        {/* Detalle técnico (solo en desarrollo) */}
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.78rem',
          color: 'var(--rosa-vibrante)',
          opacity: '0.7',
          backgroundColor: 'rgba(232, 75, 138, 0.08)',
          padding: '8px 16px',
          borderRadius: '6px',
          maxWidth: '420px',
        }}>
          ⚠️ {error}
        </p>

        {/* Botón de reintento */}
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 'var(--espaciado-s)',
            padding: '10px 24px',
            backgroundColor: 'var(--rosa-vibrante)',
            color: 'var(--crema-blanco)',
            fontFamily: 'var(--fuente-cuerpo)',
            fontSize: '0.92rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          🔄 Intentar de nuevo
        </button>

      </div>
    )
  }

  // Mensaje de error (no bloquea, solo informa)
  const bannerError = error && productos?.length > 0 &&  (
    <div style={{
      backgroundColor: 'var(--rosa-suave)',
      color: 'var(--marron-texto)',
      fontFamily: 'var(--fuente-cuerpo)',
      fontSize: '0.9rem',
      padding: 'var(--espaciado-s) var(--espaciado-l)',
      textAlign: 'center',
      borderBottom: '1px solid var(--rosa-vibrante)',
    }}>
      ⚠️ {error} — Mostrando catálogo local
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
         padding: esMovil
          ? '0 var(--espaciado-m)'
          : '0 var(--espaciado-l)',
        marginTop: 'var(--espaciado-m)',
      }}>
        {productos.length} producto{productos.length !== 1 ? 's' : ''} encontrado{productos.length !== 1 ? 's' : ''}
      </p>


    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columnas}, minmax(260px, 1fr))`,
       gap: esMovil
          ? 'var(--espaciado-m)'
          : 'var(--espaciado-l)',
        padding: esMovil
          ? 'var(--espaciado-m)'
          : 'var(--espaciado-m) var(--espaciado-l) var(--espaciado-l)',
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