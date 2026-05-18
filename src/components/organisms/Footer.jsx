import useResponsive from '../../hooks/useResponsive'

function Footer() {
  const { esMovil } = useResponsive()

  return (
    <footer style={{
      backgroundColor: 'var(--marron-texto)',
      color: 'var(--crema-blanco)',
      padding: esMovil
        ? 'var(--espaciado-m)'
        : 'var(--espaciado-l)',
      textAlign: 'center',
      marginTop: 'auto',
    }}>

      <p style={{
        fontFamily: 'var(--fuente-titulo)',
        fontSize: esMovil ? '1.2rem' : '1.4rem',
        marginBottom: '8px',
        letterSpacing: '0.05em',
      }}>
        🕯️ Love Store
      </p>

      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.85rem',
        opacity: '0.75',
        marginBottom: '12px',
      }}>
        Velas artesanales hechas con amor — Medellín, Colombia
      </p>

      <div style={{
        display: 'flex',
         flexDirection: esMovil ? 'column' : 'row',
        gap: esMovil ? '6px' : 'var(--espaciado-l)',
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.9rem',
      }}>
        <span>📱 (+57) 3136383207</span>
        <span>📸 @love.store.med</span>
      </div>

      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.75rem',
        opacity: '0.5',
        marginTop: '16px',
      }}>
        Domicilio sin costo en Medellín · Envíos a todo el país
      </p>

    </footer>
  )
}

export default Footer