import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from './config'
import MOCK_PRODUCTS from '../mockdata/products'

// Lee todos los productos de Firestore
export const obtenerProductosFirestore = async () => {
  try {
    const q = query(
      collection(db, 'productos'),
      orderBy('id', 'asc')
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      console.warn('Firestore vacío — usando mockdata Love Store')
      return MOCK_PRODUCTS
    }

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      firestoreId: doc.id
    }))

  } catch (error) {
    console.error('Error al leer productos de Firestore:', error)
    return MOCK_PRODUCTS  // Fallback al mockdata
  }
}

// Lee un producto por su ID
export const obtenerProductoPorIdFirestore = async (id) => {
  try {
    const docRef = doc(db, 'productos', String(id))
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { ...docSnap.data(), firestoreId: docSnap.id }
    }

    return null

  } catch (error) {
    console.error('Error al leer producto de Firestore:', error)
    return null
  }
}

// Carga inicial: sube el mockdata de Love Store a Firestore
// Solo se ejecuta una vez para poblar la base de datos
export const seedProductos = async () => {
  try {
    console.log('🌱 Iniciando carga de productos a Firestore...')

    for (const producto of MOCK_PRODUCTS) {
      await setDoc(
        doc(db, 'productos', String(producto.id)),
        producto
      )
      console.log(`✅ Producto cargado: ${producto.nombre}`)
    }

    console.log('🎉 Todos los productos cargados en Firestore')
    return { exito: true }

  } catch (error) {
    console.error('Error en seed de productos:', error)
    return { exito: false }
  }
}