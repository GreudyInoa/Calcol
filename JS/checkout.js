/* ================================
   RESUMEN DEL CARRITO
   ================================ */

/* Selecciona los elementos del resumen */
const resumenHeader = document.getElementById('resumen-header');
const resumenProductos = document.getElementById('resumen-productos');
const resumenFlecha = document.getElementById('resumen-flecha');
const resumenTitulo = document.getElementById('resumen-titulo');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutTotal = document.getElementById('checkout-total');

/* Abre y cierra el resumen al hacer clic */
resumenHeader.addEventListener('click', function() {
    resumenProductos.classList.toggle('abierto');
    resumenFlecha.classList.toggle('abierto');
});

/* ================================
   CARGAR CARRITO DESDE LOCALSTORAGE
   ================================ */

/* Lee el carrito guardado */
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* Muestra los productos en el resumen */
function mostrarResumen() {

    /* Si el carrito está vacío */
    if (carrito.length === 0) {
        resumenTitulo.textContent = 'Resumen del carrito (0 artículos)';
        checkoutSubtotal.textContent = '$0';
        checkoutTotal.textContent = '$2.000';
        return;
    }

    /* Cuenta total y artículos */
    let total = 0;
    let articulos = 0;

    /* Limpia el resumen */
    resumenProductos.innerHTML = '';

    /* Agrega cada producto */
    carrito.forEach(producto => {
        const precio = parseInt(producto.precio.replace(/\D/g, ''));
        total += precio * producto.cantidad;
        articulos += producto.cantidad;

        resumenProductos.innerHTML += `
            <div class="resumen-item">
                <img class="resumen-item-imagen" src="${producto.imagen}" alt="${producto.nombre}">
                <div class="resumen-item-info">
                    <span class="resumen-item-nombre">${producto.nombre}</span>
                    <span class="resumen-item-precio">${producto.precio}</span>
                </div>
                <span class="resumen-item-cantidad">${producto.cantidad}</span>
            </div>
        `;
    });

    /* Actualiza el título y totales */
    resumenTitulo.textContent = `Resumen del carrito (${articulos} artículos)`;
    checkoutSubtotal.textContent = '$' + total.toLocaleString('es-CL');
    checkoutTotal.textContent = '$' + (total + 2000).toLocaleString('es-CL');
}

/* Llama la función al cargar */
mostrarResumen();

/* ================================
   MODAL MÉTODO DE PAGO
   ================================ */

/* Selecciona los elementos del modal */
const modalOverlay = document.getElementById('modal-overlay');
const modalPago = document.getElementById('modal-pago');
const modalAgregarPago = document.getElementById('modal-agregar-pago');
const btnEditarPago = document.getElementById('btn-editar-pago');
const btnModalCerrar = document.getElementById('modal-cerrar');
const btnModalGuardar = document.getElementById('modal-guardar');
const btnAgregarPago = document.getElementById('agregar-pago');
const btnModalCerrarAgregar = document.getElementById('modal-cerrar-agregar');
const metodoPagoTexto = document.getElementById('metodo-pago-texto');

/* Abre el modal de pago */
btnEditarPago.addEventListener('click', function() {
    modalOverlay.classList.add('abierto');
    modalPago.classList.add('abierto');
});

/* Cierra el modal al hacer clic en X */
btnModalCerrar.addEventListener('click', function() {
    modalOverlay.classList.remove('abierto');
    modalPago.classList.remove('abierto');
});

/* Cierra el modal al hacer clic en el overlay */
modalOverlay.addEventListener('click', function() {
    modalOverlay.classList.remove('abierto');
    modalPago.classList.remove('abierto');
    modalAgregarPago.classList.remove('abierto');
});

/* Guarda el método de pago seleccionado */
btnModalGuardar.addEventListener('click', function() {

    const metodoSeleccionado = document.querySelector('input[name="pago"]:checked');
    
    if (!metodoSeleccionado) return;

    if (metodoSeleccionado.value === 'efectivo') {
        metodoPagoTexto.textContent = 'Efectivo';
        document.getElementById('metodo-pago-icono').src = '../Imagenes/Carrito/dinero.png';
    } else {
        /* Busca en div en vez de label */
        const opcionSeleccionada = metodoSeleccionado.closest('div.modal-opcion');
        const textoTarjeta = opcionSeleccionada.querySelector('span').textContent;
        const iconoTarjeta = opcionSeleccionada.querySelector('img').src;
        metodoPagoTexto.textContent = textoTarjeta;
        document.getElementById('metodo-pago-icono').src = iconoTarjeta;
    }

    modalOverlay.classList.remove('abierto');
    modalPago.classList.remove('abierto');
});

/* Abre el modal de agregar pago */
btnAgregarPago.addEventListener('click', function() {
    modalPago.classList.remove('abierto');
    modalAgregarPago.classList.add('abierto');
});

/* Cierra el modal de agregar pago */
btnModalCerrarAgregar.addEventListener('click', function() {
    modalAgregarPago.classList.remove('abierto');
    modalPago.classList.add('abierto');
});

/* ================================
   FORMULARIO DE TARJETA
   ================================ */

const tarjetaNumero = document.getElementById('tarjeta-numero');
const tarjetaNombre = document.getElementById('tarjeta-nombre');
const tarjetaFecha = document.getElementById('tarjeta-fecha');
const tarjetaCvv = document.getElementById('tarjeta-cvv');
const tarjetaLogo = document.getElementById('tarjeta-logo');
const tarjetaNumeroPreview = document.getElementById('tarjeta-numero-preview');
const tarjetaNombrePreview = document.getElementById('tarjeta-nombre-preview');
const tarjetaFechaPreview = document.getElementById('tarjeta-fecha-preview');
const btnGuardarTarjeta = document.getElementById('modal-guardar-tarjeta');

/* Detecta si es Visa o Mastercard y actualiza preview */
tarjetaNumero.addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{4})/g, '$1 ').trim();
    this.value = valor;

    const primerDigito = valor.charAt(0);
    if (primerDigito === '5') {
       tarjetaLogo.src = '../Imagenes/Carrito/icono-mastercard.png';
   } else {
        tarjetaLogo.src = '../Imagenes/Carrito/icono-visa.png';
   }

    tarjetaNumeroPreview.textContent = valor || '**** **** **** ****';
});

/* Actualiza el nombre en el preview */
tarjetaNombre.addEventListener('input', function() {
    tarjetaNombrePreview.textContent = this.value.toUpperCase() || 'NOMBRE EN LA TARJETA';
});

/* Bloquea números en el nombre */
tarjetaNombre.addEventListener('keydown', function(e) {
    const permitidas = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]$/;
    const teclas = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!permitidas.test(e.key) && !teclas.includes(e.key)) {
        e.preventDefault();
    }
});

tarjetaNombre.addEventListener('paste', function(e) {
    const texto = e.clipboardData.getData('text');
    if (/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/.test(texto)) {
        e.preventDefault();
    }
});

tarjetaNombre.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '');
});

/* Formatea y actualiza la fecha */
tarjetaFecha.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace') {
        e.preventDefault();
        this.value = this.value.slice(0, -1).replace(/\/$/, '');
        tarjetaFechaPreview.textContent = this.value || 'MM/AA';
    }
});

tarjetaFecha.addEventListener('input', function() {
    let valor = this.value.replace(/\D/g, '');
    if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    this.value = valor;
    tarjetaFechaPreview.textContent = valor || 'MM/AA';
});

/* Solo números en CVV */
tarjetaCvv.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
});

/* Guarda la tarjeta y la agrega al modal */
btnGuardarTarjeta.addEventListener('click', function() {

    const numero = tarjetaNumero.value;
    const nombre = tarjetaNombre.value;
    const fecha = tarjetaFecha.value;
    const cvv = tarjetaCvv.value;

    if (!numero || !nombre || !fecha || !cvv) {
        alert('Por favor completa todos los campos');
        return;
    }

    const ultimos4 = numero.replace(/\D/g, '').slice(-4);
    const primerDigito = numero.replace(/\D/g, '').charAt(0);
    let tipo = '';
    let logoSrc = '';

    if (primerDigito === '4') {
        tipo = 'Visa';
        logoSrc = '../Imagenes/Carrito/icono-visa.png';
    } else if (primerDigito === '5') {
        tipo = 'Mastercard';
        logoSrc = '../Imagenes/Carrito/icono-mastercard.png';
    } else {
        tipo = 'Tarjeta';
        logoSrc = '../Imagenes/Carrito/icono-visa.png';
    }

    /* Crea la nueva opción en el modal */
    const nuevaOpcion = document.createElement('div');
    nuevaOpcion.className = 'modal-opcion';
    nuevaOpcion.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            <img class="modal-icono" src="${logoSrc}" alt="${tipo}">
            <span>${tipo} ••••${ultimos4}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; cursor:pointer;">
                <img src="../Imagenes/Carrito/bote-de-basura.png" style="width:18px; height:18px;">
            </button>
            <input type="radio" name="pago" value="tarjeta-${ultimos4}">
        </div>
    `;

    /* La inserta antes del botón agregar */
    const btnAgregarPagoEl = document.getElementById('agregar-pago');
    modalPago.insertBefore(nuevaOpcion, btnAgregarPagoEl);

    /* Selecciona automáticamente la nueva tarjeta */
    nuevaOpcion.querySelector('input').checked = true;

    /* Actualiza el texto del método de pago */
    metodoPagoTexto.textContent = `${tipo} ••••${ultimos4}`;
    document.getElementById('metodo-pago-icono').src = logoSrc;

    /* Limpia el formulario */
    tarjetaNumero.value = '';
    tarjetaNombre.value = '';
    tarjetaFecha.value = '';
    tarjetaCvv.value = '';
    tarjetaNumeroPreview.textContent = '**** **** **** ****';
    tarjetaNombrePreview.textContent = 'NOMBRE EN LA TARJETA';
    tarjetaFechaPreview.textContent = 'MM/AA';

    /* Cierra agregar y abre pago */
    modalAgregarPago.classList.remove('abierto');
    modalPago.classList.add('abierto');
});

/* ================================
   BOTÓN HACER PEDIDO
   ================================ */

const btnHacerPedido = document.getElementById('btn-hacer-pedido');


btnHacerPedido.addEventListener('click', async function() {
     // Verificar si hay sesión activa
    const sesion = JSON.parse(sessionStorage.getItem('calcol_sesion')) || null;
    if (!sesion) {
        alert('Debes iniciar sesión para hacer un pedido');
        window.location.href = '/Calcol/login.html';
        return;
    }

    const direccion = document.getElementById('direccion').value;
    if (!direccion) {
        alert('Por favor ingresa tu dirección de entrega');
        return;
    }
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const instrucciones = document.getElementById('instrucciones')?.value || '';
    const cubiertos = document.getElementById('pedir-cubiertos')?.checked ? 1 : 0;
    const salsa = document.getElementById('pedir-salsa')?.checked ? 1 : 0;
    

    let subtotal = 0;
    const items = carrito.map(p => {
        const precio = parseInt(p.precio.replace(/\D/g, ''));
        subtotal += precio * p.cantidad;
        return {
            producto_id: p.id || null,
            cantidad:    p.cantidad,
            precio:      precio,
            nota:        p.nota || ''
        };
    });

    
    try {
        const res  = await fetch('/Calcol/api/pedido.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario_id:    sesion ? sesion.id : null,
                direccion,
                instrucciones,
                subtotal,
                envio:         2000,
                total:         subtotal + 2000,
                cubiertos,
                salsa,
                items
            })
        });
        const data = await res.json();

        if (data.error) {
            alert('Error: ' + data.error);
            return;
        }

        localStorage.removeItem('carrito');
        window.location.href = '../confirmacion.html';

    } catch (e) {
    alert('Error de conexión con el servidor.');
    }
});
