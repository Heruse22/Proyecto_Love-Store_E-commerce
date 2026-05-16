
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

function MainLayout({ children, totalItemsCarrito }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--crema-claro)',
    }}>
      <Header totalItemsCarrito={totalItemsCarrito} />

      <main style={{ flexGrow: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout