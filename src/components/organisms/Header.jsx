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
  }


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
      gap: 'var(--espaciado-m)',
      flexWrap: 'wrap',
    }}>

      {/* Logo + Nombre */}
       <Link to="/" style={{ textDecoration: 'none' }}></Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <a href="/"><img src=".../src/assets/img/logo_love_store.webp" alt="Logo Love Store" style={{ height: '50px' }} /></a>
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

       {/* Navegación derecha */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>

        {estaLogueado ? (
          <>
            {/* Saludo al usuario */}
            <span style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.88rem',
              color: 'var(--marron-texto)',
              opacity: '0.75',
            }}>
              👤 {usuario?.nombre}
            </span>

            {/* Botón cerrar sesión */}
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
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            {/* Link login */}
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
              Iniciar sesión
            </Link>

            {/* Link registro */}
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
          </>
        )}

        {/* Botón carrito */}
        <div
          onClick={onAbrirCarrito}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '8px 14px',
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
            fontWeight: '500',
            fontSize: '0.88rem',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          🛒 ({totalItems})
        </div>

      </div>
    </header>
  )
}

export default Header
