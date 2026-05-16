
function Badge({ texto, variante = 'precio' }) {

  const estilos = {
    precio: {
      backgroundColor: 'var(--negro-precio)',
      color: 'var(--crema-blanco)',
    },
    categoria: {
      backgroundColor: 'var(--beige-fondo)',
      color: 'var(--marron-texto)',
      border: '1px solid var(--dorado)',
    },
    destacado: {
      backgroundColor: 'var(--rosa-vibrante)',
      color: 'var(--crema-blanco)',
    }
  }

  return (
    <span
      style={{
        ...estilos[variante],
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.88rem',
        fontWeight: '500',
        padding: '4px 12px',
        borderRadius: '4px',
        letterSpacing: '0.04em',
        display: 'inline-block',
        width: 'fit-content',
      }}
    >
      {texto}
    </span>
  )
}

export default Badge