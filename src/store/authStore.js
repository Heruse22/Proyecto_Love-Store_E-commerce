import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import MOCK_USERS from '../mockdata/users'

const useAuthStore = create(
  persist(
    (set, get) => ({

      usuario: null,       // Datos del usuario logueado
      estaLogueado: false, // Bandera de sesión activa
      error: null,         // Mensaje de error en login

     
      // Valida credenciales contra el mockdata de usuarios
      login: (email, password) => {
        const encontrado = MOCK_USERS.find(
          u => u.email === email && u.password === password
        )

        if (encontrado) {
          // Guarda el usuario sin la contraseña por seguridad
          const { password: _, ...usuarioSeguro } = encontrado
          set({
            usuario: usuarioSeguro,
            estaLogueado: true,
            error: null
          })
          return { exito: true }
        }

        set({ error: 'Correo o contraseña incorrectos' })
        return { exito: false }
      },

      // Registra un nuevo usuario y lo guarda en el store
      registro: (nombre, email, password) => {

        // Verifica si el email ya existe
        const existe = MOCK_USERS.find(u => u.email === email)
        if (existe) {
          set({ error: 'Este correo ya está registrado' })
          return { exito: false }
        }

        // Crea el nuevo usuario
        const nuevoUsuario = {
          id: Date.now(),
          nombre,
          email,
          rol: 'cliente',
          ciudad: 'Colombia'
        }

        // Agrega al mockdata en memoria
        MOCK_USERS.push({ ...nuevoUsuario, password })

        // Inicia sesión automáticamente después del registro
        set({
          usuario: nuevoUsuario,
          estaLogueado: true,
          error: null
        })

        return { exito: true }
      },

      // Cierra la sesión del usuario
      logout: () => {
        set({
          usuario: null,
          estaLogueado: false,
          error: null
        })
      },

      // Limpia el mensaje de error
      limpiarError: () => set({ error: null })
    }),

    
    {
      name: 'love-store-sesion', // Clave en localStorage
      // Solo persiste usuario y estaLogueado, no el error
      partialize: (state) => ({
        usuario: state.usuario,
        estaLogueado: state.estaLogueado
      })
    }
  )
)

export default useAuthStore
