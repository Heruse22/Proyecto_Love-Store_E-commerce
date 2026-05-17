import { useState, useEffect } from 'react'

function useDebounce(valor, delay = 250) {

  const [valorDebounced, setValorDebounced] = useState(valor)

  useEffect(() => {

    
    const temporizador = setTimeout(() => {
      setValorDebounced(valor)
    }, delay)

    // Limpia el temporizador si el valor cambia antes
    // de que se cumpla el delay — esto es el debounce
    return () => clearTimeout(temporizador)

  }, [valor, delay])

  return valorDebounced
}

export default useDebounce