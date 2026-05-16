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

export default App