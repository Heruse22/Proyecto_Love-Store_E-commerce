
import Input from '../atoms/Input'

function SearchBar({ valor, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--espaciado-s)',
      maxWidth: '400px',
      width: '100%',
    }}>
      <span style={{ fontSize: '1.1rem' }}>🔍</span>
      <Input
        placeholder="Buscar velas, ramos, sets..."
        valor={valor}
        onChange={onChange}
        tipo="text"
      />
    </div>
  )
}

export default SearchBar