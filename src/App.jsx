function App() {
  return (
    <div>
      <header style={{
        backgroundColor: 'var(--beige-fondo)',
        borderBottom: '3px solid var(--dorado)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <h1 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '2rem',
          color: 'var(--marron-texto)'
        }}>
          🕯️ Love Store
        </h1>
      </header>

      <main style={{ padding: '32px', backgroundColor: 'var(--crema-claro)' }}>
        <p style={{ fontFamily: 'var(--fuente-cuerpo)' }}>
          ¡Proyecto React configurado con éxito! 🎉
        </p>
      </main>
    </div>
  )
}
// src/App.jsx — Prueba temporal del mockdata
import MOCK_PRODUCTS from './mockdata/products'
import CATEGORIAS from './mockdata/categories'

function App() {
  return (
    <div>
      <header style={{
        backgroundColor: 'var(--beige-fondo)',
        borderBottom: '3px solid var(--dorado)',
        padding: '16px 32px',
      }}>
        <h1 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '2rem',
          color: 'var(--marron-texto)'
        }}>
          🕯️ Love Store
        </h1>
      </header>

      <main style={{ padding: '32px', backgroundColor: 'var(--crema-claro)' }}>

        {/* Verificación de categorías */}
        <h2 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '1.5rem', marginBottom: '12px' }}>
          Categorías ({CATEGORIAS.length})
        </h2>
        <ul style={{ marginBottom: '32px' }}>
          {CATEGORIAS.map(cat => (
            <li key={cat.id}>{cat.nombre} — {cat.descripcion}</li>
          ))}
        </ul>

        {/* Verificación de productos */}
        <h2 style={{ fontFamily: 'var(--fuente-titulo)', fontSize: '1.5rem', marginBottom: '12px' }}>
          Productos ({MOCK_PRODUCTS.length})
        </h2>
        <ul>
          {MOCK_PRODUCTS.map(p => (
            <li key={p.id}>
              <strong>{p.nombre}</strong> — ${p.precio.toLocaleString('es-CO')} COP
            </li>
          ))}
        </ul>

      </main>
    </div>
  )
}

export default App

