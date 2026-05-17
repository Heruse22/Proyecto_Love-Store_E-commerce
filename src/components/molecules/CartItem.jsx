import Badge from '../atoms/Badge'

function CartItem({ item, onAumentar, onReducir, onQuitar }) {

  const { producto, cantidad } = item

  const nombre = producto.nombre || producto.title
  const imagen = producto.imagen || producto.image
  const precioUnit = producto.precio || producto.price
  const subtotal = precioUnit * cantidad

  // Formato de precio según origen (COP o USD)
  const formatearPrecio = (valor) => {
    return producto.precio
      ? `$${valor.toLocaleString('es-CO')} COP`
      : `$${valor.toFixed(2)} USD`
  }

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--espaciado-m)',
      padding: 'var(--espaciado-m)',
      backgroundColor: 'var(--crema-blanco)',
      borderRadius: 'var(--radio-tarjeta)',
      boxShadow: 'var(--sombra-suave)',
      alignItems: 'center',
      border: '1px solid rgba(201, 181, 160, 0.4)',
    }}>

      {/* Imagen del producto */}
      <img
        src={imagen}
        alt={nombre}
        style={{
          width: '90px',
          height: '90px',
          objectFit: 'cover',
          borderRadius: '10px',
          flexShrink: 0,
          border: '1px solid var(--crema-claro)',
        }}
      />

      {/* Info del producto */}
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        minWidth: 0,
      }}>

        {/* Nombre */}
        <h3 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.05rem',
          fontWeight: '600',
          color: 'var(--marron-texto)',
          lineHeight: '1.3',

          // Corta el texto si es muy largo
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {nombre}
        </h3>

        {/* Precio unitario */}
        <Badge
          texto={`Precio: ${formatearPrecio(precioUnit)}`}
          variante="categoria"
        />

        {/* Controles de cantidad */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '4px',
        }}>

          {/* Botón reducir */}
          <button
            onClick={() => onReducir(producto.id)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '2px solid var(--beige-fondo)',
              backgroundColor: 'var(--crema-claro)',
              color: 'var(--marron-texto)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--rosa-vibrante)'
              e.currentTarget.style.color = 'var(--crema-blanco)'
              e.currentTarget.style.borderColor = 'var(--rosa-vibrante)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--crema-claro)'
              e.currentTarget.style.color = 'var(--marron-texto)'
              e.currentTarget.style.borderColor = 'var(--beige-fondo)'
            }}
          >
            −
          </button>

          {/* Cantidad actual */}
          <span style={{
            fontFamily: 'var(--fuente-cuerpo)',
            fontWeight: '600',
            fontSize: '1rem',
            color: 'var(--marron-texto)',
            minWidth: '24px',
            textAlign: 'center',
          }}>
            {cantidad}
          </span>

          {/* Botón aumentar */}
          <button
            onClick={() => onAumentar(producto.id)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '2px solid var(--rosa-vibrante)',
              backgroundColor: 'var(--rosa-vibrante)',
              color: 'var(--crema-blanco)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            +
          </button>

        </div>
      </div>

      {/* Subtotal + Botón eliminar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px',
        flexShrink: 0,
      }}>

        {/* Subtotal del item */}
        <Badge
          texto={formatearPrecio(subtotal)}
          variante="precio"
        />

        {/* Botón eliminar */}
        <button
          onClick={() => onQuitar(producto.id)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--marron-texto)',
            opacity: '0.45',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'var(--fuente-cuerpo)',
            textDecoration: 'underline',
            padding: '2px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.45'}
        >
          Eliminar
        </button>

      </div>
    </div>
  )
}

export default CartItem