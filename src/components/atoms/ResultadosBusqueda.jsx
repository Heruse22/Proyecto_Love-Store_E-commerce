function ResultadosBusqueda({ total, busqueda, categoria }) {

  const hayFiltros = busqueda.trim() || categoria !== 'todas'

  if (!hayFiltros) return null

  // Construye el mensaje según los filtros activos
  const partes = []
  if (busqueda.trim()) {
    partes.push(`"${busqueda.trim()}"`)
  }
  if (categoria !== 'todas') {
    partes.push(`en categoría "${categoria}"`)
  }

  return (
    <div style={{
      padding: '10px var(--espaciado-l)',
      fontFamily: 'var(--fuente-cuerpo)',
      fontSize: '0.88rem',
      color: 'var(--marron-texto)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap',
    }}>

      {/* Punto de color indicador */}
      <span style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: total > 0
          ? 'var(--rosa-vibrante)'
          : 'var(--morado)',
        flexShrink: 0,
      }} />

      {total > 0 ? (
        <span>
          <strong>{total}</strong> resultado{total !== 1 ? 's' : ''} para{' '}
          {partes.join(' ')}
        </span>
      ) : (
        <span style={{ opacity: '0.7' }}>
          Sin resultados para {partes.join(' ')}
        </span>
      )}

    </div>
  )
}

export default ResultadosBusqueda