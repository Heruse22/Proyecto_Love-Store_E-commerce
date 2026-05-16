async function mostrarProductos() {
    const productos = await obtenerProductos();
    const contenedor = document.getElementById("productos");

    productos.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" />
            <h3>${producto.title}</h3>
            <p class="precio">$${producto.price}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(tarjeta);        
    });
    
}

function agregarAlCarrito(id) {
    console.log("Producto agregado:", id);
    // Aquí implementaré la lógica del carrito con la función de agregar al carrito
    }

    // Llamamos a la función para mostrar los prodcutos al crgar la página
    mostrarProductos();

    tarjeta.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}" />
        <div class="tarjeta-body">
        <h3>${producto.title}</h3>
        <span class="precio">$${producto.price}</span>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
    `;

    