
function Paginacion({
  paginaActual,
  totalPaginas,
  irAPagina,
  irAnterior,
  irSiguiente,
  hayAnterior,
  haySiguiente,
  indiceInicio,
  indiceFin,
  totalItems,
}) {

  // No renderiza si solo hay una página
  if (totalPaginas <= 1) return null

  // Genera el array de números de página a mostrar
  // Si hay más de 5 páginas, muestra solo las cercanas
  const generarNumerosPagina = () => {
    if (totalPaginas <= 5) {
      return Array.from({ length: totalPaginas }, (_, i) => i + 1)
    }

    const paginas = []

    // Siempre muestra la primera página
    paginas.push(1)

    // Puntos suspensivos antes si la página actual es > 3
    if (paginaActual > 3) paginas.push('...')

    // Páginas cercanas a la actual
    const inicio = Math.max(2, paginaActual - 1)
    const fin = Math.min(totalPaginas - 1, paginaActual + 1)

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i)
    }

    // Puntos suspensivos después si la página actual es < totalPaginas - 2
    if (paginaActual < totalPaginas - 2) paginas.push('...')

    // Siempre muestra la última página
    paginas.push(totalPaginas)

    return paginas
  }

  const numerosPagina = generarNumerosPagina()

  // Estilos base reutilizables
  const estiloBotonBase = {
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.9rem',
    fontWeight: '500',
    width: '38px',
    height: '38px',
    borderRadius: '8px',
    border: '1px solid var(--beige-fondo)',
    backgroundColor: 'var(--crema-blanco)',
    color: 'var(--marron-texto)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  }

  const estiloBotonActivo = {
    ...estiloBotonBase,
    backgroundColor: 'var(--rosa-vibrante)',
    color: 'var(--crema-blanco)',
    border: '2px solid var(--rosa-vibrante)',
    fontWeight: '700',
  }

  const estiloBotonDeshabilitado = {
    ...estiloBotonBase,
    opacity: '0.35',
    cursor: 'not-allowed',
  }

  const estiloBotonNavegacion = (habilitado) => ({
    fontFamily: 'var(--fuente-cuerpo)',
    fontSize: '0.88rem',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    border: habilitado
      ? '1px solid var(--rosa-vibrante)'
      : '1px solid var(--beige-fondo)',
    backgroundColor: habilitado
      ? 'transparent'
      : 'var(--crema-claro)',
    color: habilitado
      ? 'var(--rosa-vibrante)'
      : 'var(--marron-texto)',
    cursor: habilitado ? 'pointer' : 'not-allowed',
    opacity: habilitado ? '1' : '0.4',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  })

  return (
    <div style={{
      padding: 'var(--espaciado-l) var(--espaciado-l)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--espaciado-m)',
    }}>

      {/* Resumen de productos visibles */}
      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.85rem',
        color: 'var(--marron-texto)',
        opacity: '0.65',
      }}>
        Mostrando{' '}
        <strong>{indiceInicio + 1}–{indiceFin}</strong>
        {' '}de{' '}
        <strong>{totalItems}</strong>
        {' '}productos
      </p>

      {/* Controles de navegación */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>

        {/* Botón Anterior */}
        <button
          onClick={irAnterior}
          disabled={!hayAnterior}
          style={estiloBotonNavegacion(hayAnterior)}
          onMouseEnter={e => {
            if (hayAnterior) {
              e.currentTarget.style.backgroundColor = 'var(--rosa-vibrante)'
              e.currentTarget.style.color = 'var(--crema-blanco)'
            }
          }}
          onMouseLeave={e => {
            if (hayAnterior) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--rosa-vibrante)'
            }
          }}
        >
          ← Anterior
        </button>

        {/* Números de página */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {numerosPagina.map((pagina, index) => {

            // Puntos suspensivos — no son botones
            if (pagina === '...') {
              return (
                <span
                  key={`puntos-${index}`}
                  style={{
                    ...estiloBotonBase,
                    cursor: 'default',
                    border: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '1rem',
                    letterSpacing: '2px',
                  }}
                >
                  ···
                </span>
              )
            }

            const esActual = pagina === paginaActual

            return (
              <button
                key={pagina}
                onClick={() => irAPagina(pagina)}
                style={esActual ? estiloBotonActivo : estiloBotonBase}
                onMouseEnter={e => {
                  if (!esActual) {
                    e.currentTarget.style.backgroundColor = 'var(--rosa-suave)'
                    e.currentTarget.style.borderColor = 'var(--rosa-vibrante)'
                  }
                }}
                onMouseLeave={e => {
                  if (!esActual) {
                    e.currentTarget.style.backgroundColor = 'var(--crema-blanco)'
                    e.currentTarget.style.borderColor = 'var(--beige-fondo)'
                  }
                }}
              >
                {pagina}
              </button>
            )
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={irSiguiente}
          disabled={!haySiguiente}
          style={estiloBotonNavegacion(haySiguiente)}
          onMouseEnter={e => {
            if (haySiguiente) {
              e.currentTarget.style.backgroundColor = 'var(--rosa-vibrante)'
              e.currentTarget.style.color = 'var(--crema-blanco)'
            }
          }}
          onMouseLeave={e => {
            if (haySiguiente) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--rosa-vibrante)'
            }
          }}
        >
          Siguiente →
        </button>

      </div>

      {/* Indicador de página actual */}
      <p style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.8rem',
        color: 'var(--marron-texto)',
        opacity: '0.45',
      }}>
        Página {paginaActual} de {totalPaginas}
      </p>

    </div>
  )
}

export default Paginacion