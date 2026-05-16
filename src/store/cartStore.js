import { create } from "zustand";
import { persist } from "zustand/middleware";


const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Agrega un producto al carrito
      agregarItem: (producto) => {
        
        const items = get().items
        const existe = items.find(item => item.producto.id === producto.id)

         if (existe) {

          set({
            items: items.map(item =>
              item.producto.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          })
          } else {
            set({ items: [...items, { producto, cantidad: 1 }] })
        }

      },

      // Elimina un producto del carrito

      quitarItem: (productoId) => {
        set({
          items: get().items.filter(item => item.producto.id !== productoId)
        })
      },

      // Aumenta en 1 la cantidad de un producto

      aumentarCantidad: (productoId) => {
        set({
          items: get().items.map(item =>
            item.producto.id === productoId
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        })
      },

      // Reduce en 1 la cantidad — si llega a 0 lo elimina
      reducirCantidad: (productoId) => {
        const items = get().items
        const item = items.find(i => i.producto.id === productoId)

        if (item && item.cantidad === 1) {
          // Si es el último, lo elimina del carrito
          get().quitarItem(productoId)
        } else {
          set({
            items: items.map(item =>
              item.producto.id === productoId
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
          })
        }
      },

      // Vacía el carrito completo (se usará en Checkout)
      vaciarCarrito: () => set({ items: [] }),

    

      // Total de unidades en el carrito (para el contador del header)
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + item.cantidad, 0
        )
      },

      // Precio total del carrito
      getTotalPrecio: () => {
        return get().items.reduce((total, item) => {
          const precio = item.producto.precio || item.producto.price || 0
          return total + precio * item.cantidad
        }, 0)
      }
    }),

  
    {
      name: 'love-store-carrito', // Nombre en localStorage
    }
  )
)

        
export default useCartStore;
