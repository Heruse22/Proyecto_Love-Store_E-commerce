import CartItem from '../molecules/CartItem'
import Button from '../atoms/Button'
import useCartStore from '../../store/cartStore'

function Cart({ onCerrar, onCheckout }) {

  // Acciones y estado del store
  const items = useCartStore(state => state.items)
  const aumentarCantidad = useCartStore(state => state.aumentarCantidad)
  const reducirCantidad = useCartStore(state => state.reducirCantidad)
  const quitarItem = useCartStore(state => state.quitarItem)
  const vaciarCarrito = useCartStore(state => state.vaciarCarrito)

  // Total calculado directamente desde items
  const totalPrecio = useCartStore(state =>
    state.items.reduce((total, item) => {
      const precio = item.producto.precio || item.producto.price || 0
      return total + precio * item.cantidad
    }, 0)
  )

  const totalItems = useCartStore(state =>
    state.items.reduce((total, item) => total + item.cantidad, 0)
  )

  // Formato del total según moneda
  const hayPreciosCOP = items.some(item => item.producto.precio)
  const totalFormateado = hayPreciosCOP
    ? `$${totalPrecio.toLocaleString('es-CO')} COP`
    : `$${totalPrecio.toFixed(2)} USD`

  return (
    <>
      {/* Fondo oscuro detrás del panel */}
      <div
        onClick={onCerrar}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(43, 24, 16, 0.45)',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel lateral del carrito */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '480px',
        height: '100vh',
        backgroundColor: 'var(--crema-claro)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-4px 0 24px rgba(43, 24, 16, 0.2)',
      }}>

        {/* ── Encabezado del carrito ── */}
        <div style={{
          padding: 'var(--espaciado-m) var(--espaciado-l)',
          backgroundColor: 'var(--beige-fondo)',
          borderBottom: '2px solid var(--dorado)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: '1.6rem',
              color: 'var(--marron-texto)',
            }}>
              🛒 Tu Carrito
            </h2>
            <p style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.85rem',
              color: 'var(--marron-texto)',
              opacity: '0.65',
            }}>
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </p>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onCerrar}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--marron-texto)',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e =>
              e.currentTarget.style.backgroundColor = 'rgba(43,24,16,0.1)'
            }
            onMouseLeave={e =>
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          >
            ✕
          </button>
        </div>

        {/* ── Lista de items o carrito vacío ── */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 'var(--espaciado-m)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--espaciado-m)',
        }}>

          {items.length === 0 ? (

            // Carrito vacío
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 'var(--espaciado-m)',
              opacity: '0.6',
            }}>
              <span style={{ fontSize: '3rem' }}>🕯️</span>
              <p style={{
                fontFamily: 'var(--fuente-titulo)',
                fontSize: '1.3rem',
                color: 'var(--marron-texto)',
              }}>
                Tu carrito está vacío
              </p>
              <p style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.9rem',
                color: 'var(--marron-texto)',
                textAlign: 'center',
              }}>
                Agrega productos del catálogo para comenzar
              </p>
            </div>

          ) : (

            // Lista de productos
            items.map(item => (
              <CartItem
                key={item.producto.id}
                item={item}
                onAumentar={aumentarCantidad}
                onReducir={reducirCantidad}
                onQuitar={quitarItem}
              />
            ))

          )}
        </div>

        {/* ── Resumen y acciones (solo si hay items) ── */}
        {items.length > 0 && (
          <div style={{
            padding: 'var(--espaciado-m) var(--espaciado-l)',
            backgroundColor: 'var(--crema-blanco)',
            borderTop: '2px solid var(--beige-fondo)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--espaciado-m)',
          }}>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--fuente-titulo)',
                fontSize: '1.2rem',
                color: 'var(--marron-texto)',
              }}>
                Total
              </span>
              <span style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--marron-texto)',
                backgroundColor: 'var(--negro-precio)',
                color: 'var(--crema-blanco)',
                padding: '6px 14px',
                borderRadius: '6px',
              }}>
                {totalFormateado}
              </span>
            </div>

            {/* Botón checkout */}
            <Button
              texto="Proceder al Checkout →"
              variante="primario"
              onClick={onCheckout}
            />

            {/* Vaciar carrito */}
            <button
              onClick={vaciarCarrito}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.82rem',
                color: 'var(--marron-texto)',
                opacity: '0.5',
                cursor: 'pointer',
                textDecoration: 'underline',
                textAlign: 'center',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
            >
              Vaciar carrito
            </button>

          </div>
        )}

      </div>
    </>
  )
}

export default Cart