/* ================================
   ESTO ES DE LOS FILTROS DE CATEGORÍAS
   ================================ */

/* Selecciona todos los botones de filtro */
const botones = document.querySelectorAll('.filtro-btn');

/*Selecciona todas las tarjetas */
const tarjetas = document.querySelectorAll('.tarjeta-producto');


/* ================================
   MOSTRAR COMPLETOS AL CARGAR
   ================================ */

/* Oculta todas las tarjetas que no sean completos al cargar */
tarjetas.forEach(tarjeta => {
    if (tarjeta.dataset.categoria !== 'completos') {
        tarjeta.style.display = 'none';
    }
});


/*Escucha el clic en cada boton del filtro */
botones.forEach(boton => {
    boton.addEventListener('click', function() {

    /*Quita activo de todos los botones */
    botones.forEach(btn => btn.classList.remove('activo'));

    /*Pone activo al boton al clickear */
    this.classList.add('activo');

    /*Obtiene la categoria del boton clickeado */
    const filtro = this.dataset.filtro;

    /*Muestra u oculta cada tarjeta segun categoria */
    tarjetas.forEach(tarjeta => {
        if(tarjeta.dataset.categoria === filtro) {
            tarjeta.style.display = 'flex';
        } else {
            tarjeta.style.display = 'none';
        }
    });
    });
});

/* ================================
   CARRITO
   ================================ */

/* Selecciona todos los botones de agregar */
const botonesAgregar = document.querySelectorAll('.btn-agregar');

/*Escucha el clic en cada boton agregar */
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {

    /* Encuentra el producto-extra dentro de la misma tarjeta */
    const extra = this.previousElementSibling;

    /* Muestra el producto-extra */
    extra.style.display = 'block';

    /* Oculta el boton de agregar */
    this.style.display = 'none';
    });
});

/* ================================
   BOTONES + Y -
   ================================ */

/* Selecciona todos los botones de menos */
const botonesMenos = document.querySelectorAll('.btn-menos');

/* Seleciona todos los botones de mas */
const botonesMas = document.querySelectorAll('.btn-mas');

/*  El Boton menos (-)  le resta 1 a la cantidad */
botonesMenos.forEach(boton => {
    boton.addEventListener('click',function() {

        /*Encuentra el numero de cantidad */
        const numero = this.nextElementSibling;

        /* Solo resta si es mayor a 1 */
        if (parseInt(numero.textContent) > 1){
            numero.textContent = parseInt(numero.textContent) -1;
        }
    });
});

/* Boton mas (+) suma 1 a la cantidad */
botonesMas.forEach(boton => {
    boton.addEventListener('click', function(){

        /*Encuentra el numero de cantidad */
        const numero = this.previousElementSibling;

        /* Suma 1 */
        numero.textContent = parseInt(numero.textContent) + 1;
    });
});

/* ================================
   BLOQUEAR NÚMEROS Y SIGNOS EN NOTA
   ================================ */

const camposNota = document.querySelectorAll('.producto-nota input');

camposNota.forEach(input => {

    /* Bloquea teclas no permitidas */
    input.addEventListener('keydown', function(e) {
        const permitidas = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]$/;
        const teclas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
        if (!permitidas.test(e.key) && !teclas.includes(e.key)) {
            e.preventDefault();
        }
    });

    /* Bloquea pegar texto con caracteres no permitidos */
    input.addEventListener('paste', function(e) {
        const texto = e.clipboardData.getData('text');
        if (/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/.test(texto)) {
            e.preventDefault();
        }
    });

    /* Limpia cualquier caracter raro que logre entrar */
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '');
    });
});

/* ================================
   BOTÓN LISTO
   ================================ */

/* Selecciona todos los botones listo */
const botonesListos = document.querySelectorAll('.btn-listo');

/* Escucha el clic en cada boton de listo */
botonesListos.forEach(boton => {
    boton.addEventListener('click', function(){

        /* Encuentra la tarjeta completa */
        const tarjeta = this.closest('.tarjeta-producto');

        /* Obtiene el nombre del producto */
        const nombre = tarjeta.querySelector('.producto-nombre').textContent;

        /* Obtiene la cantidad */
        const cantidad = parseInt(tarjeta.querySelector('.numero-cantidad').textContent);

        /* Obtiene el precio */
        const precio = tarjeta.querySelector('.producto-precio').textContent;

        /* Obtiene la imagen */
        const imagen = tarjeta.querySelector('.imagen-producto').src;

        /* Obtiene la nota */
        const nota = tarjeta.querySelector('.producto-nota input').value;

        /* Agrega el producto al carrito */
        carrito.push({ nombre, precio, imagen, cantidad, nota });

        /* Solo actualiza el contador — sin abrir el carrito */
        actualizarCarrito();

        /* Oculta el producto-extra */
        const extra = this.closest('.producto-extra');
        extra.style.display = 'none';

        /* Muestra el botón agregar de nuevo */
        extra.nextElementSibling.style.display = 'block';

        /* Resetea la cantidad a 1 */
        tarjeta.querySelector('.numero-cantidad').textContent = '1';

        /* Limpia el campo de nota */
        tarjeta.querySelector('.producto-nota input').value = '';
    });
});

/* ================================
   PANEL CARRITO
   ================================ */

/* Selecciona los elementos del carrito */
const panelCarrito = document.getElementById('panel-carrito');
const carritoOverlay = document.getElementById('carrito-overlay');
const btnCarritoFlotante = document.getElementById('btn-carrito-flotante');
const btnCarritoCerrar = document.getElementById('carrito-cerrar');
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const carritoContador = document.getElementById('carrito-contador');

/* Array que guarda los productos del carrito */
let carrito = [];

/* Función para abrir el carrito */
function abrirCarrito() {
    panelCarrito.classList.add('abierto');
    carritoOverlay.classList.add('abierto');
}

/* Función para cerrar el carrito */
function cerrarCarrito() {
    panelCarrito.classList.remove('abierto');
    carritoOverlay.classList.remove('abierto');
}

/* Abre el carrito al hacer clic en el botón flotante */
btnCarritoFlotante.addEventListener('click', abrirCarrito);

/* Cierra el carrito al hacer clic en el botón cerrar */
btnCarritoCerrar.addEventListener('click', cerrarCarrito);

/* Cierra el carrito al hacer clic en el overlay */
carritoOverlay.addEventListener('click', cerrarCarrito);

/* ================================
   ACTUALIZAR CARRITO
   ================================ */

/* Función para actualizar el carrito */
function actualizarCarrito() {

    /* Si el carrito está vacío muestra el mensaje */
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        carritoTotal.textContent = '$0';
        carritoContador.textContent = '0';
        document.getElementById('pedir-cubiertos').checked = false;
         document.getElementById('pedir-salsa').checked = false; 
        return;
    }

    /* Limpia la lista */
    carritoItems.innerHTML = '';

    /* Variables para el total y contador */
    let total = 0;
    let contador = 0;

    /* Agrega cada producto al carrito */
    carrito.forEach((producto, index) => {

        /* Suma al total */
        const precio = parseInt(producto.precio.replace(/\D/g, ''));
        total += precio * producto.cantidad;
        contador += producto.cantidad;

        /* Crea el HTML de cada item */
        carritoItems.innerHTML += `
            <div class="carrito-item">
                <img class="carrito-item-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-item-info">
                    <span class="carrito-item-nombre">${producto.nombre}</span>
                    ${producto.nota ? `<span class="carrito-item-nota">Sin: ${producto.nota}</span>` : ''}
                    <span class="carrito-item-precio">${producto.precio}</span>
                </div>
                <div class="carrito-item-controles">
                   <button class="carrito-item-eliminar" onclick="eliminarProducto(${index})">
                       <img src="../Imagenes/Carrito/bote-de-basura.png" alt="Eliminar">
                    </button>
                    <div class="cantidad">
                         <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
                         <span class="numero-cantidad">${producto.cantidad}</span>
                        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
                    </div>
                 </div>
            </div>
        `;
    });

    /* Actualiza el total y contador */
    carritoTotal.textContent = '$' + total.toLocaleString('es-CL');
    carritoContador.textContent = contador;

    /* Guarda el carrito en localStorage */
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
}

/* ================================
   CAMBIAR CANTIDAD Y ELIMINAR
   ================================ */

/* Función para cambiar cantidad en el carrito */
function cambiarCantidad(index, cambio) {
    carrito[index].cantidad += cambio;

    /* Si la cantidad llega a 0 elimina el producto */
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    actualizarCarrito();
}

/* Función para eliminar producto del carrito */
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

/* ================================
   ABRIR CARRITO DESDE INDEX
   ================================ */

/* Si la URL tiene ?carrito=abierto — abre el carrito automático */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('carrito') === 'abierto') {
    abrirCarrito();
}