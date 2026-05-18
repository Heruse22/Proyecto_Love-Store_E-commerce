import { useState, useEffect } from 'react'

const BREAKPOINTS = {
  movil: 640,    // Hasta 640px → móvil
  tablet: 1024,  // Hasta 1024px → tablet
}

function useResponsive() {

  const [ancho, setAncho] = useState(window.innerWidth)

  useEffect(() => {
    const manejarResize = () => setAncho(window.innerWidth)

    window.addEventListener('resize', manejarResize)

    // Limpia el listener al desmontar el componente
    return () => window.removeEventListener('resize', manejarResize)
  }, [])

  return {
    esMovil: ancho < BREAKPOINTS.movil,
    esTablet: ancho >= BREAKPOINTS.movil && ancho < BREAKPOINTS.tablet,
    esDesktop: ancho >= BREAKPOINTS.tablet,
    ancho,
  }
}

export default useResponsive