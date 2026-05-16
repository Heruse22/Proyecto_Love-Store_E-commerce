import Badge from '../atoms/Badge'
import Button from '../atoms/Button'

function ProductCard({ producto, onAgregar }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--crema-blanco)',
        borderRadius: 'var(--radio-tarjeta)',
        overflow: 'hidden',
        boxShadow: 'var(--sombra-suave)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(201, 181, 160, 0.4)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = 'var(--sombra-hover)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--sombra-suave)'
      }}
    >
      {/* Imagen del producto */}
      <img
        src={producto.imagen || producto.image}
        alt={producto.nombre || producto.title}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
          borderBottom: '2px solid var(--crema-claro)',
        }}
      />

      {/* Cuerpo de la tarjeta */}
      <div style={{
        padding: 'var(--espaciado-m)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--espaciado-s)',
        flexGrow: 1,
      }}>

        {/* Categoría (si existe) */}
        {(producto.categoria || producto.category) && (
          <Badge
            texto={producto.categoria || producto.category}
            variante="categoria"
          />
        )}

        {/* Nombre del producto */}
        <h3 style={{
          fontFamily: 'var(--fuente-titulo)',
          fontSize: '1.15rem',
          fontWeight: '600',
          color: 'var(--marron-texto)',
          lineHeight: '1.3',
        }}>
          {producto.nombre || producto.title}
        </h3>

        {/* Descripción corta */}
        <p style={{
          fontFamily: 'var(--fuente-cuerpo)',
          fontSize: '0.85rem',
          color: 'var(--marron-texto)',
          opacity: '0.75',
          lineHeight: '1.5',
          flexGrow: 1,

          // Recorta a 2 líneas
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {producto.descripcion || producto.description}
        </p>

        {/* Precio */}
        <Badge
          texto={
            producto.precio
              ? `$${producto.precio.toLocaleString('es-CO')} COP`
              : `$${producto.price} USD`
          }
          variante="precio"
        />

        {/* Botón agregar al carrito */}
        <Button
          texto="🕯️ Agregar al carrito"
          variante="primario"
          onClick={() => onAgregar(producto)}
        />
      </div>
    </div>
  )
}

export default ProductCard