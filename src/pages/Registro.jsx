import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function Registro() {

  const navigate = useNavigate()
  const registro = useAuthStore(state => state.registro)
  const error = useAuthStore(state => state.error)
  const estaLogueado = useAuthStore(state => state.estaLogueado)
  const limpiarError = useAuthStore(state => state.limpiarError)

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })
  const [errorLocal, setErrorLocal] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (estaLogueado) navigate('/')
    limpiarError()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrorLocal('')
    if (error) limpiarError()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación local de contraseñas
    if (form.password !== form.confirmar) {
      setErrorLocal('Las contraseñas no coinciden')
      return
    }

    if (form.password.length < 6) {
      setErrorLocal('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setCargando(true)

    setTimeout(() => {
      const resultado = registro(form.nombre, form.email, form.password)
      setCargando(false)
      if (resultado.exito) navigate('/')
    }, 500)
  }

  const mensajeError = errorLocal || error

  // Estilos reutilizables para los campos
  const estiloLabel = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--marron-texto)',
    opacity: '0.75',
  }

  const estiloInput = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.95rem',
    color: 'var(--marron-texto)',
    backgroundColor: 'var(--crema-blanco)',
    border: '1px solid var(--beige-fondo)',
    borderRadius: '8px',
    padding: '10px 14px',
    outline: 'none',
    transition: 'border-color 0.2s',
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
      <div style={{ textAlign: 'center', marginBottom: 'var(--espaciado-l)' }}>
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
          Crea tu cuenta y empieza a comprar
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
          Crear cuenta
        </h2>

        {/* Mensaje de error */}
        {mensajeError && (
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
            ⚠️ {mensajeError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--espaciado-m)',
        }}>

          {/* Nombre */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={estiloLabel}>Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              style={estiloInput}
              onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
              onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={estiloLabel}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
              style={estiloInput}
              onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
              onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
            />
          </div>

          {/* Contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={estiloLabel}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              style={estiloInput}
              onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
              onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
            />
          </div>

          {/* Confirmar contraseña */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={estiloLabel}>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmar"
              value={form.confirmar}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
              style={estiloInput}
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
                : 'var(--morado)',
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
            {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

        </form>

        {/* Link a login */}
        <p style={{
          marginTop: 'var(--espaciado-m)',
          textAlign: 'center',
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.88rem',
          color: 'var(--marron-texto)',
          opacity: '0.7',
        }}>
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            style={{
              color: 'var(--rosa-vibrante)',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Registro