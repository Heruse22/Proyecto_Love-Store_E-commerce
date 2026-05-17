import { useState, useEffect } from 'react'

function usePaginacion(items, itemsPorPagina = 6) {

  const [paginaActual, setPaginaActual] = useState(1)

  // Cada vez que cambian los items (por filtros o búsqueda)
  // regresa automáticamente a la primera página
  useEffect(() => {
    setPaginaActual(1)
  }, [items])

  // Total de páginas necesarias
  const totalPaginas = Math.ceil(items.length / itemsPorPagina)

  // Índices de corte para el slice
  const indiceInicio = (paginaActual - 1) * itemsPorPagina
  const indiceFin = indiceInicio + itemsPorPagina

  // Productos visibles en la página actual
  const itemsPaginaActual = items.slice(indiceInicio, indiceFin)

  // Navega a una página específica
  const irAPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaActual(numero)

      // Hace scroll suave al inicio de la galería
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const irAnterior = () => irAPagina(paginaActual - 1)
  const irSiguiente = () => irAPagina(paginaActual + 1)

  return {
    paginaActual,
    totalPaginas,
    itemsPaginaActual,
    irAPagina,
    irAnterior,
    irSiguiente,
    hayAnterior: paginaActual > 1,
    haySiguiente: paginaActual < totalPaginas,
    indiceInicio,
    indiceFin: Math.min(indiceFin, items.length),
    totalItems: items.length,
  }
}

export default usePaginacion