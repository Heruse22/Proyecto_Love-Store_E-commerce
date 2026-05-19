import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC4g_6LtEaoRL5RFGSCrXLrQbTdeHsrGGs",
  authDomain: "love-store-39600.firebaseapp.com",
  projectId: "love-store-39600",
  storageBucket: "love-store-39600.firebasestorage.app",
  messagingSenderId: "485514271529",
  appId: "1:485514271529:web:d86a300f2e498b2e4b3538"
}
;

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig)

// Exporta los servicios que usaremos
export const auth = getAuth(app)       // Para Authentication
export const db = getFirestore(app)    // Para Firestore

export default app