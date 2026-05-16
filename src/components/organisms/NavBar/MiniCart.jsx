import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../../store/cartStore';
import { imageMap } from '../../../assets/imageMap';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const items        = useCartStore((s) => s.items);
  const totalItems   = useCartStore((s) => s.getTotalItems());
  const totalPrice   = useCartStore((s) => s.getTotalPrice());
  const removeItem   = useCartStore((s) => s.removeItem);
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);

  /* Cierra el dropdown al hacer click fuera */
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* ── Botón del carrito ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center gap-1.5 text-amber-900 hover:text-amber-700 transition-colors"
        aria-label="Abrir carrito"
      >
        {/* Ícono vela / carrito */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218
               c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25
               L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0
               .75.75 0 0 1 1.5 0Z" />
        </svg>

        {/* Burbuja con cantidad */}
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold
                           w-5 h-5 rounded-full flex items-center justify-center shadow-sm
                           animate-bounce-once">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute right-0 top-10 w-80 bg-[#fdf6ee] border border-amber-200
                        rounded-2xl shadow-2xl shadow-amber-900/10 z-50 overflow-hidden">

          {/* Cabecera */}
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 flex justify-between items-center">
            <span className="font-semibold text-amber-900 text-sm tracking-wide">
              🕯️ Tu cesta ({totalItems})
            </span>
            <button onClick={() => setOpen(false)} className="text-amber-400 hover:text-amber-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Lista de productos */}
          <div className="max-h-64 overflow-y-auto divide-y divide-amber-100">
            {items.length === 0 ? (
              <p className="text-center text-amber-500 text-sm py-8">
                Tu cesta está vacía 🕯️
              </p>
            ) : (
              items.map(({ product, quantity }) => {
                const img = imageMap[product.image] ?? product.image;
                return (
                  <div key={product.id} className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors">
                    {/* Imagen */}
                    <img src={img} alt={product.title}
                         className="w-12 h-12 object-cover rounded-lg border border-amber-100 flex-shrink-0" />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-amber-900 truncate">{product.title}</p>
                      <p className="text-xs text-amber-600">${Number(product.price).toFixed(2)}</p>

                      {/* Controles cantidad */}
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => decrementItem(product.id)}
                                className="w-5 h-5 rounded-full border border-amber-300 text-amber-700
                                           text-xs flex items-center justify-center hover:bg-amber-100">
                          −
                        </button>
                        <span className="text-xs font-bold text-amber-900 w-4 text-center">{quantity}</span>
                        <button onClick={() => incrementItem(product.id)}
                                className="w-5 h-5 rounded-full border border-amber-300 text-amber-700
                                           text-xs flex items-center justify-center hover:bg-amber-100">
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal + eliminar */}
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs font-bold text-amber-800">
                        ${(Number(product.price) * quantity).toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(product.id)}
                              className="text-red-400 hover:text-red-600 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pie: total + botones */}
          {items.length > 0 && (
            <div className="px-4 py-3 bg-amber-50 border-t border-amber-100 space-y-2">
              <div className="flex justify-between text-sm font-bold text-amber-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Link to="/cart" onClick={() => setOpen(false)}
                      className="flex-1 text-center text-xs py-2 border border-amber-400 text-amber-700
                                 rounded-lg hover:bg-amber-100 transition-colors font-medium">
                  Ver cesta
                </Link>
                <Link to="/checkout" onClick={() => setOpen(false)}
                      className="flex-1 text-center text-xs py-2 bg-amber-700 text-amber-50
                                 rounded-lg hover:bg-amber-800 transition-colors font-semibold">
                  Pagar →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}