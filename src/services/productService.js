import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

// Trae todos los productos de la API
export const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get(`${BASE_URL}/products`)
    return respuesta.data
  } catch (error) {
    console.error('Error al obtener productos:', error)
    throw error
  }
}

// Trae un producto por su ID
export const obtenerProductoPorId = async (id) => {
  try {
    const respuesta = await axios.get(`${BASE_URL}/products/${id}`)
    return respuesta.data
  } catch (error) {
    console.error('Error al obtener producto:', error)
    throw error
  }
}

// Trae todos los productos de una categoría específica
export const obtenerProductosPorCategoria = async (categoria) => {
  try {
    const respuesta = await axios.get(
      `${BASE_URL}/products/category/${categoria}`
    )
    return respuesta.data
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error)
    throw error
  }
}

// Trae la lista de categorías disponibles en la API
export const obtenerCategorias = async () => {
  try {
    const respuesta = await axios.get(`${BASE_URL}/products/categories`)
    return respuesta.data
  } catch (error) {
    console.error('Error al obtener categorías:', error)
    throw error
  }
}