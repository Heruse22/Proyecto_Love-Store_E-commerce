// Usuarios de prueba:
//   patricia@lovestore.com / lovestore2026
//   cliente@demo.com / cliente123

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Login() {

  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)
  const error = useAuthStore(state => state.error)
  const estaLogueado = useAuthStore(state => state.estaLogueado)
  const limpiarError = useAuthStore(state => state.limpiarError)

  const [form, setForm] = useState({ email: '', password: '' })
  const [cargando, setCargando] = useState(false)

  // Si ya está logueado, redirige al inicio
  useEffect(() => {
    if (estaLogueado) navigate('/')
    // Limpia errores al entrar a la página
    limpiarError()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) limpiarError()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCargando(true)

    // Simula un pequeño delay de autenticación
    setTimeout(() => {
      const resultado = login(form.email, form.password)
      setCargando(false)
      if (resultado.exito) navigate('/')
    }, 500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--crema-claro)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--espaciado-l)',
    }}>

      {/* Logo y título */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'var(--espaciado-l)',
      }}>
        <span style={{ fontSize: '3rem' }}>🕯️</span>
        <h1 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '2.2rem',
          color: 'var(--marron-texto)',
          marginTop: '8px',
        }}>
          Love Store
        </h1>
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.9rem',
          color: 'var(--marron-texto)',
          opacity: '0.6',
          marginTop: '4px',
        }}>
          Inicia sesión para continuar
        </p>
      </div>

      {/* Tarjeta del formulario */}
      <div style={{
        backgroundColor: 'var(--crema-blanco)',
        borderRadius: 'var(--radio-tarjeta)',
        boxShadow: 'var(--sombra-suave)',
        padding: 'var(--espaciado-l)',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid rgba(201, 181, 160, 0.4)',
      }}>

        <h2 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.6rem',
          color: 'var(--marron-texto)',
          marginBottom: 'var(--espaciado-l)',
        }}>
          Iniciar sesión
        </h2>

        {/* Mensaje de error */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(232, 75, 138, 0.12)',
            border: '1px solid var(--rosa-vibrante)',
            borderRadius: '8px',
            padding: '10px 14px',
            marginBottom: 'var(--espaciado-m)',
            fontFamily: 'var(--fuente-cuerpo)',
            fontSize: '0.88rem',
            color: 'var(--rosa-vibrante)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--espaciado-m)',
        }}>

          {/* Campo email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.85rem',
              fontWeight: '500',
              color: 'var(--marron-texto)',
              opacity: '0.75',
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.95rem',
                color: 'var(--marron-texto)',
                backgroundColor: 'var(--crema-blanco)',
                border: '1px solid var(--beige-fondo)',
                borderRadius: '8px',
                padding: '10px 14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
              onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
            />
          </div>

          {/* Campo contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.85rem',
              fontWeight: '500',
              color: 'var(--marron-texto)',
              opacity: '0.75',
            }}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.95rem',
                color: 'var(--marron-texto)',
                backgroundColor: 'var(--crema-blanco)',
                border: '1px solid var(--beige-fondo)',
                borderRadius: '8px',
                padding: '10px 14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
              onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
            />
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              marginTop: '8px',
              padding: '12px',
              backgroundColor: cargando
                ? 'var(--beige-fondo)'
                : 'var(--rosa-vibrante)',
              color: 'var(--crema-blanco)',
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              border: 'none',
              borderRadius: '8px',
              cursor: cargando ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (!cargando) e.currentTarget.style.opacity = '0.88'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            {cargando ? 'Verificando...' : 'Iniciar sesión'}
          </button>

        </form>

        {/* Hint de usuarios de prueba */}
        <div style={{
          marginTop: 'var(--espaciado-m)',
          padding: '10px 14px',
          backgroundColor: 'var(--crema-claro)',
          borderRadius: '8px',
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.8rem',
          color: 'var(--marron-texto)',
          opacity: '0.7',
          lineHeight: '1.6',
        }}>
          <strong>Usuarios de prueba:</strong><br />
          📧 patricia@lovestore.com / lovestore2026<br />
          📧 cliente@demo.com / cliente123
        </div>

        {/* Link a registro */}
        <p style={{
          marginTop: 'var(--espaciado-m)',
          textAlign: 'center',
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.88rem',
          color: 'var(--marron-texto)',
          opacity: '0.7',
        }}>
          ¿No tienes cuenta?{' '}
          <Link
            to="/registro"
            style={{
              color: 'var(--rosa-vibrante)',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Regístrate aquí
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login