const sesion = JSON.parse(sessionStorage.getItem('calcol_sesion') || localStorage.getItem('calcol_sesion') || 'null');
if (sesion && sesion.nombre) {
  document.getElementById('nombre-txt').textContent = '¡Bienvenido, ' + sesion.nombre + '!';
}

setTimeout(() => {
  document.getElementById('wrap').classList.add('fadeout');
}, 4500);

setTimeout(() => {
  window.location.href = 'index.html';
}, 5000);