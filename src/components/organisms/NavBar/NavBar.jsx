import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../services/authService';
import MiniCart from './MiniCart';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium transition-all duration-200 pb-1 border-b-2 ${
      isActive(path)
        ? 'text-amber-700 border-amber-600'
        : 'text-amber-900/70 border-transparent hover:text-amber-800 hover:border-amber-300'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#fdf6ee] border-b border-amber-200 shadow-sm shadow-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Ícono vela decorativa */}
            <span className="text-2xl">🕯️</span>
            <span className="text-xl font-bold text-amber-900 tracking-tight
                             group-hover:text-amber-700 transition-colors font-serif">
              Love Store
            </span>
          </Link>

          {/* ── Links desktop ── */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link to="/gallery" className={linkClass('/gallery')}>Productos</Link>
            </li>

            {loggedInUser ? (
              <li>
                <Link to="/profile" className={linkClass('/profile')}>Perfil</Link>
              </li>
            ) : (
              <>
                <li><Link to="/login" className={linkClass('/login')}>Ingresar</Link></li>
                <li><Link to="/register" className={linkClass('/register')}>Registro</Link></li>
              </>
            )}
          </ul>

          {/* ── Lado derecho: MiniCart ── */}
          <div className="flex items-center gap-4">
            <MiniCart />

            {/* Botón menú móvil */}
            <button
              className="md:hidden p-2 rounded-md text-amber-800 hover:bg-amber-100 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Menú móvil ── */}
        {menuOpen && (
          <div className="md:hidden border-t border-amber-100 py-3 flex flex-col gap-3 pb-4">
            <Link to="/gallery" onClick={() => setMenuOpen(false)}
                  className="text-amber-900 text-sm font-medium px-2 py-1 rounded hover:bg-amber-50">
              Productos
            </Link>
            {loggedInUser ? (
              <Link to="/profile" onClick={() => setMenuOpen(false)}
                    className="text-amber-900 text-sm font-medium px-2 py-1 rounded hover:bg-amber-50">
                Perfil
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                      className="text-amber-900 text-sm font-medium px-2 py-1 rounded hover:bg-amber-50">
                  Ingresar
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                      className="text-amber-900 text-sm font-medium px-2 py-1 rounded hover:bg-amber-50">
                  Registro
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}