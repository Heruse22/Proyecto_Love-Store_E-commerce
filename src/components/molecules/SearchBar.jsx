
import Input from '../atoms/Input'

function SearchBar({ valor, onChange, onLimpiar }) {
    const hayBusqueda = valor.trim().length > 0
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--espaciado-s)',
      maxWidth: '400px',
      width: '100%',
      position: 'relative',
    }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        fontSize: '1rem',
        color: 'var(--marron-texto)',
        opacity: hayBusqueda ? '1' : '0.45',
        transition: 'opacity 0.2s',
        zIndex: 1,
        pointerEvents: 'none',
        }}>🔍</span>
      
      <input
        type="text"
        value={valor}
        onChange={onChange}
        placeholder="Buscar velas, ramos, sets..."
        style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.95rem',
          color: 'var(--marron-texto)',
          backgroundColor: 'var(--crema-blanco)',
          border: hayBusqueda
            ? '2px solid var(--rosa-vibrante)'
            : '1px solid var(--beige-fondo)',
          borderRadius: '8px',
          padding: '10px 40px 10px 36px',
          width: '100%',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={e => {
          if (!hayBusqueda) {
            e.target.style.borderColor = 'var(--rosa-vibrante)'
          }
        }}
        onBlur={e => {
          if (!hayBusqueda) {
            e.target.style.borderColor = 'var(--beige-fondo)'
          }
        }}
      />

      {/* Botón limpiar — solo visible cuando hay texto */}
      {hayBusqueda && (
        <button
          onClick={onLimpiar}
          style={{
            position: 'absolute',
            right: '10px',
            backgroundColor: 'var(--beige-fondo)',
            border: 'none',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: 'var(--marron-texto)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e =>
            e.currentTarget.style.backgroundColor = 'var(--rosa-suave)'
          }
          onMouseLeave={e =>
            e.currentTarget.style.backgroundColor = 'var(--beige-fondo)'
          }
          title="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
      
    </div>
  )
}

export default SearchBar