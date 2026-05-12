const API_URL = "https://fakestoreapi.com/products";

// Trae todos los productos
async function obtenerProductos() {
  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// Trae un solo producto por ID
async function obtenerProductoPorId(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}

// Trae todos los productos
async function obtenerProductos() {
  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

// Trae un solo producto por ID
async function obtenerProductoPorId(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`);
    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}