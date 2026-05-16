function Spinner() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--espaciado-xl)',
      gap: 'var(--espaciado-m)',
    }}>

      {/* Anillo giratorio */}
      <div style={{
        width: '52px',
        height: '52px',
        border: '4px solid var(--crema-claro)',
        borderTop: '4px solid var(--rosa-vibrante)',
        borderRadius: '50%',
        animation: 'girar 0.9s linear infinite',
      }} />

      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        color: 'var(--marron-texto)',
        opacity: '0.6',
        fontSize: '0.95rem',
      }}>
        Cargando productos...
      </p>

      {/* Keyframe de la animación */}
      <style>{`
        @keyframes girar {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Spinner