function Button({ texto, onClick, variante = 'primario', tipo = 'button' }) {

  const estilos = {
    primario: {
      backgroundColor: 'var(--rosa-vibrante)',
      color: 'var(--crema-blanco)',
    },
    secundario: {
      backgroundColor: 'var(-   ado)',
      color: 'var(--crema-blanco)',
    },
    oscuro: {
      backgroundColor: 'var(--negro-precio)',
      color: 'var(--crema-blanco)',
    }
  }

  return (
    <button
      type={tipo}
      onClick={onClick}
      style={{
        ...estilos[variante],
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.9rem',
        fontWeight: '500',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease, transform 0.15s ease',
        width: '100%',
      }}
      onMouseEnter={e => e.target.style.opacity = '0.85'}
      onMouseLeave={e => e.target.style.opacity = '1'}
      onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.target.style.transform = 'scale(1)'}
    >
      {texto}
    </button>
  )
}

export default Button