import { Link } from 'react-router-dom'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'
import useResponsive from '../../hooks/useResponsive'


function Header({ onAbrirCarrito }) {

const { esMovil, esTablet } = useResponsive()

const totalItems = useCartStore(
  state => state.items.reduce((total, item) => total + item.cantidad, 0)
)

  const usuario = useAuthStore(state => state.usuario)
  const estaLogueado = useAuthStore(state => state.estaLogueado)
  const logout = useAuthStore(state => state.logout)

  const estiloLinkNav = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.88rem',
    fontWeight: '500',
    color: 'var(--marron-texto)',
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    border: '1px solid var(--beige-fondo)',
    backgroundColor: 'var(--crema-blanco)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }


  return (
    <header style={{
      backgroundColor: 'var(--beige-fondo)',
      borderBottom: '3px solid var(--dorado)',
      padding: esMovil
        ? '0 var(--espaciado-m)'
        : '0 var(--espaciado-l)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: esMovil ? '60px' : '70px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--sombra-suave)',
      gap: 'var(--espaciado-m)',
      
    }}>

      {/* Logo + Nombre */}
       <Link to="/" style={{ textDecoration: 'none', flexShrink: 0  }}></Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a href="/"><img src=".../src/assets/img/logo_love_store.webp" alt="Logo Love Store" style={{ height: '50px' }} /></a>
        <span style={{ fontSize: esMovil ? '1.5rem' : '1.8rem' }}>
            🕯️
          </span>


        {!esMovil && (
            <h1 style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: esTablet ? '1.4rem' : '1.8rem',
              fontWeight: '600',
              color: 'var(--marron-texto)',
              letterSpacing: '0.05em',
            }}>
              Love Store
            </h1>
          )}
          {esMovil && (
            <h1 style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: '1.2rem',
              fontWeight: '600',
              color: 'var(--marron-texto)',
            }}>
              Love Store
            </h1>
          )}
      </div>

       {/* Navegación derecha */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
         gap: esMovil ? '6px' : '10px',
      }}>

        {estaLogueado ? (
          <>
            {/* En desktop muestra el nombre, en móvil solo el ícono */}
            {!esMovil && (
              <span style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.85rem',
                color: 'var(--marron-texto)',
                opacity: '0.75',
                whiteSpace: 'nowrap',
              }}>
                👤 {usuario?.nombre}
              </span>
            )}

            <button
              onClick={logout}
              style={{
                ...estiloLinkNav,
                border: '1px solid var(--rosa-vibrante)',
                color: 'var(--rosa-vibrante)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--rosa-vibrante)'
                e.currentTarget.style.color = 'var(--crema-blanco)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--rosa-vibrante)'
              }}
            >
              {esMovil ? '✕' : 'Cerrar sesión'}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={estiloLinkNav}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--rosa-vibrante)'
                e.currentTarget.style.color = 'var(--rosa-vibrante)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--beige-fondo)'
                e.currentTarget.style.color = 'var(--marron-texto)'
              }}
            >
              {esMovil ? 'Login' : 'Iniciar sesión'}
            </Link>

            {/* Registro solo visible en tablet y desktop */}
            {!esMovil && (
              <Link
                to="/registro"
                style={{
                  ...estiloLinkNav,
                  backgroundColor: 'var(--morado)',
                  color: 'var(--crema-blanco)',
                  border: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Registrarse
              </Link>
            )}
          </>
        )}

        {/* Botón carrito */}
        <div
          onClick={onAbrirCarrito}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            padding: esMovil ? '6px 10px' : '8px 14px',
            borderRadius: '8px',
            backgroundColor: totalItems > 0
              ? 'var(--rosa-vibrante)'
              : 'var(--crema-blanco)',
            color: totalItems > 0
              ? 'var(--crema-blanco)'
              : 'var(--marron-texto)',
            border: totalItems > 0
              ? 'none'
              : '1px solid var(--beige-fondo)',
            fontFamily: 'var(--fuente-cuerpo)',
            fontWeight: '600',
            fontSize: esMovil ? '0.85rem' : '0.88rem',
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          🛒 {totalItems > 0 && `(${totalItems})`}
        </div>

      </div>
    </header>
  )
}

export default Header