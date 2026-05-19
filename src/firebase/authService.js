import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

// Registra un nuevo usuario en Authentication + Firestore
export const registrarUsuario = async (nombre, email, password) => {
  try {
    // 1. Crea el usuario en Firebase Authentication
    const credencial = await createUserWithEmailAndPassword(
      auth, email, password
    )

    const usuario = credencial.user

    // 2. Actualiza el nombre en el perfil de Authentication
    await updateProfile(usuario, { displayName: nombre })

    // 3. Guarda los datos adicionales en Firestore
    await setDoc(doc(db, 'usuarios', usuario.uid), {
      nombre,
      email,
      rol: 'cliente',
      ciudad: 'Colombia',
      creadoEn: new Date().toISOString()
    })

    return {
      exito: true,
      usuario: {
        uid: usuario.uid,
        nombre,
        email,
        rol: 'cliente'
      }
    }

  } catch (error) {
    console.error('Error en registro Firebase:', error.code)

    // Mapeo de errores Firebase a mensajes en español
    const mensajes = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'El correo no tiene un formato válido',
    }

    return {
      exito: false,
      error: mensajes[error.code] || 'Error al crear la cuenta'
    }
  }
}

// Inicia sesión con email y contraseña
export const iniciarSesion = async (email, password) => {
  try {
    const credencial = await signInWithEmailAndPassword(
      auth, email, password
    )

    const usuario = credencial.user

    // Obtiene datos adicionales desde Firestore
    const docRef = doc(db, 'usuarios', usuario.uid)
    const docSnap = await getDoc(docRef)

    const datosExtra = docSnap.exists() ? docSnap.data() : {}

    return {
      exito: true,
      usuario: {
        uid: usuario.uid,
        nombre: usuario.displayName || datosExtra.nombre || 'Usuario',
        email: usuario.email,
        rol: datosExtra.rol || 'cliente'
      }
    }

  } catch (error) {
    console.error('Error en login Firebase:', error.code)

    const mensajes = {
      'auth/invalid-credential': 'Correo o contraseña incorrectos',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
    }

    return {
      exito: false,
      error: mensajes[error.code] || 'Error al iniciar sesión'
    }
  }
}

// Cierra la sesión del usuario actual
export const cerrarSesion = async () => {
  try {
    await signOut(auth)
    return { exito: true }
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
    return { exito: false }
  }
}

// Escucha cambios en el estado de autenticación
// Llama al callback cada vez que el usuario entra o sale
export const escucharAuth = (callback) => {
  return onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
      // Obtiene datos adicionales de Firestore
      const docRef = doc(db, 'usuarios', usuario.uid)
      const docSnap = await getDoc(docRef)
      const datosExtra = docSnap.exists() ? docSnap.data() : {}

      callback({
        uid: usuario.uid,
        nombre: usuario.displayName || datosExtra.nombre || 'Usuario',
        email: usuario.email,
        rol: datosExtra.rol || 'cliente'
      })
    } else {
      callback(null)
    }
  })
}