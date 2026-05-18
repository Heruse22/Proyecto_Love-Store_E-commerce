import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import useResponsive from '../hooks/useResponsive'

function Checkout() {

  const navigate = useNavigate()

 
  const items = useCartStore(state => state.items)
  const vaciarCarrito = useCartStore(state => state.vaciarCarrito)
  const usuario = useAuthStore(state => state.usuario)
  const estaLogueado = useAuthStore(state => state.estaLogueado)
  const { esMovil } = useResponsive()


  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    email: '',
    telefono: '',
    ciudad: usuario?.ciudad || '',
    direccion: '',
    notas: ''
  })
  const [errores, setErrores] = useState({})

 
  const totalPrecio = items.reduce((total, item) => {
    const precio = item.producto.precio || item.producto.price || 0
    return total + precio * item.cantidad
  }, 0)

  const totalUnidades = items.reduce(
    (total, item) => total + item.cantidad, 0
  )

  const hayPreciosCOP = items.some(item => item.producto.precio)

  const formatearPrecio = (valor) => hayPreciosCOP
    ? `$${valor.toLocaleString('es-CO')} COP`
    : `$${valor.toFixed(2)} USD`

  // Validación del formulario
  const validar = () => {
    const nuevosErrores = {}

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }
    if (!form.email.trim() || !form.email.includes('@')) {
      nuevosErrores.email = 'Ingresa un correo válido'
    }
    if (!form.telefono.trim() || form.telefono.length < 7) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido'
    }
    if (!form.ciudad.trim()) {
      nuevosErrores.ciudad = 'La ciudad es obligatoria'
    }
    if (!form.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es obligatoria'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // Limpia el error del campo al escribir
    if (errores[e.target.name]) {
      setErrores(prev => ({ ...prev, [e.target.name]: null }))
    }
  }

  const handleConfirmar = (e) => {
    e.preventDefault()

    if (!validar()) return

    setCargando(true)

    // Simula el procesamiento del pedido
    setTimeout(() => {
      vaciarCarrito()
      setPedidoConfirmado(true)
      setCargando(false)
    }, 1200)
  }

  const estiloInput = (campo) => ({
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.92rem',
    color: 'var(--marron-texto)',
    backgroundColor: 'var(--crema-blanco)',
    border: errores[campo]
      ? '1px solid var(--rosa-vibrante)'
      : '1px solid var(--beige-fondo)',
    borderRadius: '8px',
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  })

  const estiloLabel = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.82rem',
    fontWeight: '500',
    color: 'var(--marron-texto)',
    opacity: '0.7',
    marginBottom: '4px',
    display: 'block',
  }

  const estiloError = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.78rem',
    color: 'var(--rosa-vibrante)',
    marginTop: '3px',
  }

  // Pantalla de carrito vacío
  if (items.length === 0 && !pedidoConfirmado) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--crema-claro)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--espaciado-m)',
        padding: 'var(--espaciado-l)',
      }}>
        <span style={{ fontSize: '3.5rem' }}>🛒</span>
        <h2 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.8rem',
          color: 'var(--marron-texto)',
        }}>
          Tu carrito está vacío
        </h2>
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          color: 'var(--marron-texto)',
          opacity: '0.6',
          textAlign: 'center',
        }}>
          Agrega productos del catálogo antes de continuar
        </p>
        <Link
          to="/"
          style={{
            marginTop: 'var(--espaciado-m)',
            padding: '12px 28px',
            backgroundColor: 'var(--rosa-vibrante)',
            color: 'var(--crema-blanco)',
            fontFamily: 'var(--fuente-cuerpo)',
            fontWeight: '600',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'opacity 0.2s',
          }}
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  // Pantalla de pedido confirmado
  if (pedidoConfirmado) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--crema-claro)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--espaciado-m)',
        padding: 'var(--espaciado-l)',
        textAlign: 'center',
      }}>

        {/* Ícono de éxito */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--rosa-vibrante)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
        }}>
          ✓
        </div>

        <h2 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '2rem',
          color: 'var(--marron-texto)',
        }}>
          ¡Pedido confirmado!
        </h2>

        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '1rem',
          color: 'var(--marron-texto)',
          opacity: '0.75',
          maxWidth: '380px',
          lineHeight: '1.6',
        }}>
          Gracias por tu compra, <strong>{form.nombre}</strong>.
          Nos pondremos en contacto contigo pronto para coordinar la entrega.
        </p>

        {/* Datos de contacto Love Store */}
        <div style={{
          backgroundColor: 'var(--crema-blanco)',
          borderRadius: 'var(--radio-tarjeta)',
          padding: 'var(--espaciado-m) var(--espaciado-l)',
          border: '1px solid rgba(201, 181, 160, 0.4)',
          boxShadow: 'var(--sombra-suave)',
          marginTop: 'var(--espaciado-m)',
        }}>
          <p style={{
            fontFamily: 'var(--fuente-titulo)',
            fontSize: '1.1rem',
            color: 'var(--marron-texto)',
            marginBottom: '8px',
          }}>
            ¿Tienes dudas sobre tu pedido?
          </p>
          <p style={{
            fontFamily: 'var(--fuente-cuerpo)',
            fontSize: '0.9rem',
            color: 'var(--marron-texto)',
            opacity: '0.75',
            lineHeight: '1.8',
          }}>
            📱 WhatsApp: (57) 3136383207<br />
            📸 Instagram: @love.store.med
          </p>
        </div>

        <Link
          to="/"
          style={{
            marginTop: 'var(--espaciado-m)',
            padding: '12px 28px',
            backgroundColor: 'var(--rosa-vibrante)',
            color: 'var(--crema-blanco)',
            fontFamily: 'var(--fuente-cuerpo)',
            fontWeight: '600',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Seguir comprando
        </Link>

      </div>
    )
  }

  // Vista principal del checkout
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--crema-claro)',
    }}>

      {/* Header simple del checkout */}
      <header style={{
        backgroundColor: 'var(--beige-fondo)',
        borderBottom: '3px solid var(--dorado)',
        padding: '0 var(--espaciado-l)',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--sombra-suave)',
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>🕯️</span>
            <h1 style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: '1.8rem',
              fontWeight: '600',
              color: 'var(--marron-texto)',
            }}>
              Love Store
            </h1>
          </div>
        </Link>

        <Link
          to="/"
          style={{
            fontFamily: 'var(--fuente-cuerpo)',
            fontSize: '0.88rem',
            color: 'var(--marron-texto)',
            opacity: '0.65',
            textDecoration: 'none',
          }}
        >
          ← Volver al catálogo
        </Link>
      </header>

      {/* Título de la página */}
      <div style={{
        padding: 'var(--espaciado-l) var(--espaciado-l) 0',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '2rem',
          color: 'var(--marron-texto)',
          marginBottom: '4px',
        }}>
          Finalizar compra
        </h2>
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.88rem',
          color: 'var(--marron-texto)',
          opacity: '0.6',
        }}>
          {totalUnidades} {totalUnidades === 1 ? 'producto' : 'productos'} en tu carrito
        </p>
      </div>

      {/* Layout: formulario + resumen */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
       padding: esMovil
        ? 'var(--espaciado-m)'
        : 'var(--espaciado-l)',
        display: 'grid',
        gridTemplateColumns: esMovil ? '1fr' : '1fr 380px',
        gap: 'var(--espaciado-l)',
        alignItems: 'start',
      }}>

        {/* Resumen del pedido primero en móvil */}
  {esMovil && (
    <div style={{
      backgroundColor: 'var(--crema-blanco)',
      borderRadius: 'var(--radio-tarjeta)',
      boxShadow: 'var(--sombra-suave)',
      padding: 'var(--espaciado-m)',
      border: '1px solid rgba(201, 181, 160, 0.4)',
      order: -1,
    }}>
      <h3 style={{
        fontFamily: 'var(--fuente-titulo)',
        fontSize: '1.2rem',
        color: 'var(--marron-texto)',
        marginBottom: 'var(--espaciado-m)',
      }}>
        🧾 Resumen — {formatearPrecio(totalPrecio)}
      </h3>
      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.85rem',
        color: 'var(--marron-texto)',
        opacity: '0.65',
      }}>
        {totalUnidades} producto{totalUnidades !== 1 ? 's' : ''} · Envío gratis en Medellín 🎉
      </p>
    </div>
  )}


        {/* ── Formulario de entrega ── */}
        <div style={{
          backgroundColor: 'var(--crema-blanco)',
          borderRadius: 'var(--radio-tarjeta)',
          boxShadow: 'var(--sombra-suave)',
          padding: esMovil
      ? 'var(--espaciado-m)'
      : 'var(--espaciado-l)',
          border: '1px solid rgba(201, 181, 160, 0.4)',
        }}>

          <h3 style={{
            fontFamily: 'var(--fuente-titulo)',
            fontSize: '1.4rem',
            color: 'var(--marron-texto)',
            marginBottom: 'var(--espaciado-l)',
            paddingBottom: 'var(--espaciado-m)',
            borderBottom: '1px solid var(--crema-claro)',
          }}>
            📦 Datos de entrega
          </h3>

          <form
            onSubmit={handleConfirmar}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--espaciado-m)',
            }}
          >

            {/* Nombre */}
            <div>
              <label style={estiloLabel}>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                style={estiloInput('nombre')}
                onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                onBlur={e => {
                  if (!errores.nombre) {
                    e.target.style.borderColor = 'var(--beige-fondo)'
                  }
                }}
              />
              {errores.nombre && (
                <p style={estiloError}>⚠️ {errores.nombre}</p>
              )}
            </div>

            {/* Email y Teléfono en fila */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--espaciado-m)',
            }}>

              <div>
                <label style={estiloLabel}>Correo electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  style={estiloInput('email')}
                  onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                  onBlur={e => {
                    if (!errores.email) {
                      e.target.style.borderColor = 'var(--beige-fondo)'
                    }
                  }}
                />
                {errores.email && (
                  <p style={estiloError}>⚠️ {errores.email}</p>
                )}
              </div>

              <div>
                <label style={estiloLabel}>Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="3001234567"
                  style={estiloInput('telefono')}
                  onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                  onBlur={e => {
                    if (!errores.telefono) {
                      e.target.style.borderColor = 'var(--beige-fondo)'
                    }
                  }}
                />
                {errores.telefono && (
                  <p style={estiloError}>⚠️ {errores.telefono}</p>
                )}
              </div>

            </div>

            {/* Ciudad */}
            <div>
              <label style={estiloLabel}>Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={form.ciudad}
                onChange={handleChange}
                placeholder="Ej: Medellín"
                style={estiloInput('ciudad')}
                onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                onBlur={e => {
                  if (!errores.ciudad) {
                    e.target.style.borderColor = 'var(--beige-fondo)'
                  }
                }}
              />
              {errores.ciudad && (
                <p style={estiloError}>⚠️ {errores.ciudad}</p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label style={estiloLabel}>Dirección de entrega *</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Calle, número, barrio"
                style={estiloInput('direccion')}
                onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                onBlur={e => {
                  if (!errores.direccion) {
                    e.target.style.borderColor = 'var(--beige-fondo)'
                  }
                }}
              />
              {errores.direccion && (
                <p style={estiloError}>⚠️ {errores.direccion}</p>
              )}
            </div>

            {/* Notas opcionales */}
            <div>
              <label style={estiloLabel}>
                Notas adicionales{' '}
                <span style={{ opacity: '0.5', fontWeight: '400' }}>
                  (opcional)
                </span>
              </label>
              <textarea
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Indicaciones especiales para la entrega, mensaje en la tarjeta..."
                rows={3}
                style={{
                  ...estiloInput('notas'),
                  resize: 'vertical',
                  fontFamily: 'var(--fuente-cuerpo)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
                onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
              />
            </div>

            {/* Info de métodos de pago */}
            <div style={{
              backgroundColor: 'var(--crema-claro)',
              borderRadius: '10px',
              padding: 'var(--espaciado-m)',
              border: '1px solid var(--beige-fondo)',
            }}>
              <p style={{
                fontFamily: 'var(--fuente-titulo)',
                fontSize: '1rem',
                color: 'var(--marron-texto)',
                marginBottom: '6px',
              }}>
                💳 Métodos de pago disponibles
              </p>
              <p style={{
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '0.83rem',
                color: 'var(--marron-texto)',
                opacity: '0.7',
                lineHeight: '1.7',
              }}>
                • Transferencia a Bancolombia, Nequi o Daviplata<br />
                • Contra entrega en efectivo en Medellín<br />
                • Pedidos mayores a $100.000 requieren 50% de anticipo
              </p>
            </div>

            {/* Botón confirmar */}
            <button
              type="submit"
              disabled={cargando}
              style={{
                marginTop: 'var(--espaciado-s)',
                padding: '14px',
                backgroundColor: cargando
                  ? 'var(--beige-fondo)'
                  : 'var(--rosa-vibrante)',
                color: 'var(--crema-blanco)',
                fontFamily: 'var(--fuente-cuerpo)',
                fontSize: '1rem',
                fontWeight: '600',
                letterSpacing: '0.04em',
                border: 'none',
                borderRadius: '10px',
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
              {cargando ? '⏳ Procesando pedido...' : '✓ Confirmar pedido'}
            </button>

          </form>
        </div>

        {/* ── Resumen del pedido ── */}
        <div style={{
          position: 'sticky',
          top: '86px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--espaciado-m)',
        }}>

          {/* Tarjeta de resumen */}

          
          <div style={{
            backgroundColor: 'var(--crema-blanco)',
            borderRadius: 'var(--radio-tarjeta)',
            boxShadow: 'var(--sombra-suave)',
            padding: 'var(--espaciado-m)',
            border: '1px solid rgba(201, 181, 160, 0.4)',
          }}>

            <h3 style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: '1.3rem',
              color: 'var(--marron-texto)',
              marginBottom: 'var(--espaciado-m)',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--crema-claro)',
            }}>
              🧾 Resumen del pedido
            </h3>

            {/* Lista de productos */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: 'var(--espaciado-m)',
            }}>
              {items.map(({ producto, cantidad }) => {
                const nombre = producto.nombre || producto.title
                const imagen = producto.imagen || producto.image
                const precio = producto.precio || producto.price

                return (
                  <div
                    key={producto.id}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Imagen miniatura */}
                    <img
                      src={imagen}
                      alt={nombre}
                      style={{
                        width: '54px',
                        height: '54px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        flexShrink: 0,
                        border: '1px solid var(--crema-claro)',
                      }}
                    />

                    {/* Info */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'var(--fuente-titulo)',
                        fontSize: '0.95rem',
                        color: 'var(--marron-texto)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {nombre}
                      </p>
                      <p style={{
                        fontFamily: 'var(--fuente-cuerpo)',
                        fontSize: '0.8rem',
                        color: 'var(--marron-texto)',
                        opacity: '0.6',
                      }}>
                        Cantidad: {cantidad}
                      </p>
                    </div>

                    {/* Subtotal */}
                    <span style={{
                      fontFamily: 'var(--fuente-cuerpo)',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      color: 'var(--marron-texto)',
                      flexShrink: 0,
                    }}>
                      {formatearPrecio(precio * cantidad)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Separador */}
            <div style={{
              borderTop: '1px solid var(--crema-claro)',
              paddingTop: 'var(--espaciado-m)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>

              {/* Subtotal */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'var(--fuente-cuerpo)',
                  fontSize: '0.88rem',
                  color: 'var(--marron-texto)',
                  opacity: '0.65',
                }}>
                  Subtotal ({totalUnidades} productos)
                </span>
                <span style={{
                  fontFamily: 'var(--fuente-cuerpo)',
                  fontSize: '0.88rem',
                  color: 'var(--marron-texto)',
                }}>
                  {formatearPrecio(totalPrecio)}
                </span>
              </div>

              {/* Envío */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'var(--fuente-cuerpo)',
                  fontSize: '0.88rem',
                  color: 'var(--marron-texto)',
                  opacity: '0.65',
                }}>
                  Envío en Medellín
                </span>
                <span style={{
                  fontFamily: 'var(--fuente-cuerpo)',
                  fontSize: '0.88rem',
                  color: 'var(--morado)',
                  fontWeight: '600',
                }}>
                  ¡Gratis! 🎉
                </span>
              </div>

              {/* Total final */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '8px',
                paddingTop: '10px',
                borderTop: '2px solid var(--dorado)',
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
                  fontWeight: '700',
                  backgroundColor: 'var(--negro-precio)',
                  color: 'var(--crema-blanco)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                }}>
                  {formatearPrecio(totalPrecio)}
                </span>
              </div>

            </div>
          </div>

          {/* Banner de domicilio gratis */}
          <div style={{
            backgroundColor: 'var(--rosa-suave)',
            borderRadius: '10px',
            padding: 'var(--espaciado-m)',
            textAlign: 'center',
            border: '1px solid rgba(232, 75, 138, 0.2)',
          }}>
            <p style={{
              fontFamily: 'var(--fuente-titulo)',
              fontSize: '1rem',
              color: 'var(--marron-texto)',
              marginBottom: '4px',
            }}>
              🚚 Domicilio GRATIS en Medellín
            </p>
            <p style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.8rem',
              color: 'var(--marron-texto)',
              opacity: '0.75',
            }}>
              En todo el catálogo de Madres 2026
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout