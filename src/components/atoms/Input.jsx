
function Input({ placeholder, valor, onChange, tipo = 'text' }) {
  return (
    <input
      type={tipo}
      value={valor}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        fontFamily: 'var(--fuente-cuerpo)',
        fontSize: '0.95rem',
        color: 'var(--marron-texto)',
        backgroundColor: 'var(--crema-blanco)',
        border: '1px solid var(--beige-fondo)',
        borderRadius: '8px',
        padding: '10px 16px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.2s ease',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--rosa-vibrante)'}
      onBlur={e => e.target.style.borderColor = 'var(--beige-fondo)'}
    />
  )
}

export default Input