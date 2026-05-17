import CATEGORIAS from '../../mockdata/categories'

function CategoryFilter({ categoriaActiva, onCambiar }) {

  // Categoría "Todas" más las del mockdata
  const todasLasCategorias = [
    { id: 0, slug: 'todas', nombre: 'Todas' },
    ...CATEGORIAS
  ]

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center',
    }}>

      {/* Etiqueta */}
      <span style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.85rem',
        color: 'var(--marron-texto)',
        opacity: '0.65',
        marginRight: '4px',
      }}>
        Filtrar:
      </span>

      {/* Botones de categoría */}
      {todasLasCategorias.map(cat => {

        const esActiva = categoriaActiva === cat.slug

        return (
          <button
            key={cat.id}
            onClick={() => onCambiar(cat.slug)}
            style={{
              fontFamily: 'var(--fuente-cuerpo)',
              fontSize: '0.85rem',
              fontWeight: esActiva ? '600' : '400',
              padding: '6px 16px',
              borderRadius: '20px',
              border: esActiva
                ? '2px solid var(--rosa-vibrante)'
                : '1px solid var(--beige-fondo)',
              backgroundColor: esActiva
                ? 'var(--rosa-vibrante)'
                : 'var(--crema-blanco)',
              color: esActiva
                ? 'var(--crema-blanco)'
                : 'var(--marron-texto)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.03em',
            }}
            onMouseEnter={e => {
              if (!esActiva) {
                e.currentTarget.style.borderColor = 'var(--rosa-vibrante)'
                e.currentTarget.style.color = 'var(--rosa-vibrante)'
              }
            }}
            onMouseLeave={e => {
              if (!esActiva) {
                e.currentTarget.style.borderColor = 'var(--beige-fondo)'
                e.currentTarget.style.color = 'var(--marron-texto)'
              }
            }}
          >
            {cat.nombre}
          </button>
        )
      })}

    </div>
  )
}

export default CategoryFilter