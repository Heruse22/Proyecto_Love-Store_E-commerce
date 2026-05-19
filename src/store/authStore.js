import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  registrarUsuario,
  iniciarSesion,
  cerrarSesion,
  escucharAuth
} from '../firebase/authService'

const useAuthStore = create(
  persist(
    (set, get) => ({

      usuario: null,       // Datos del usuario logueado
      estaLogueado: false, // Bandera de sesión activa
      error: null,         // Mensaje de error en login
      inicializado: false, // Bandera: Firebase ya verificó la sesión

     
  // Inicia sesión con Firebase Authentication
      login: async (email, password) => {
        set({ error: null })

        const resultado = await iniciarSesion(email, password)

        if (resultado.exito) {
          set({
            usuario: resultado.usuario,
            estaLogueado: true,
            error: null
          })
          return { exito: true }
        }

        set({ error: resultado.error })
        return { exito: false }
      },

      // Registra usuario en Firebase Authentication + Firestore
      registro: async (nombre, email, password) => {
        set({ error: null })

        const resultado = await registrarUsuario(nombre, email, password)

        if (resultado.exito) {
          set({
            usuario: resultado.usuario,
            estaLogueado: true,
            error: null
          })
          return { exito: true }
        }

        set({ error: resultado.error })
        return { exito: false }
      },

      // Cierra sesión en Firebase
      logout: async () => {
        await cerrarSesion()
        set({
          usuario: null,
          estaLogueado: false,
          error: null
        })
      },

      // Sincroniza el estado con Firebase Auth al cargar la app
      // Firebase recuerda la sesión automáticamente
      inicializarAuth: () => {
        const unsubscribe = escucharAuth((usuarioFirebase) => {
          if (usuarioFirebase) {
            set({
              usuario: usuarioFirebase,
              estaLogueado: true,
              inicializado: true
            })
          } else {
            set({
              usuario: null,
              estaLogueado: false,
              inicializado: true
            })
          }
        })

        // Devuelve la función de cleanup para useEffect
        return unsubscribe
      },

      limpiarError: () => set({ error: null })
    }),

    {
      name: 'love-store-sesion-firebase',
      partialize: (state) => ({
        usuario: state.usuario,
        estaLogueado: state.estaLogueado
      })
    }
  )
)

export default useAuthStore