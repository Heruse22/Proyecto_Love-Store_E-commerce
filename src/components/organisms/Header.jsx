import useCartStore from '../../store/cartStore'

function Header({ onAbrirCarrito }) {

const totalItems = useCartStore(
  state => state.items.reduce((total, item) => total + item.cantidad, 0)
)

  return (
    <header style={{
      backgroundColor: 'var(--beige-fondo)',
      borderBottom: '3px solid var(--dorado)',
      padding: '0 var(--espaciado-l)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--sombra-suave)',
    }}>

      {/* Logo + Nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/"><img src="src/assets/img/logo_love_store.webp" alt="Logo Love Store" style={{ height: '50px' }} /></a>
        <h1 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.8rem',
          fontWeight: '600',
          color: 'var(--marron-texto)',
          letterSpacing: '0.05em',
        }}>
          Love Store
        </h1>
      </div>

      {/* Carrito */}
      <div
       onClick={onAbrirCarrito}
       style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: totalItems > 0
            ? 'var(--rosa-vibrante)'
            : 'var(--beige-fondo)',
        color: totalItems > 0
            ? 'var(--crema-blanco)'
            : 'var(--marron-texto)',
        border: totalItems > 0
            ? 'none'
            : '2px solid var(--marron-texto)',
        fontFamily: 'var(--fuente-cuerpo)',
        fontWeight: '500',
        fontSize: '0.9rem',
        transition: 'opacity 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <span>🛒</span>
        <span>Carrito ({totalItems})</span>
      </div>

    </header>
  )
}

export default Header