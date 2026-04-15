/* =============================================
   PERFIL.JS — Calcol
   Muestra datos del usuario, cierra sesión
   y permite eliminar la cuenta
   ============================================= */

// ── Cargar sesión ──
const sesion =
  JSON.parse(sessionStorage.getItem('calcol_sesion')) ||
  JSON.parse(localStorage.getItem('calcol_sesion')) ||
  null;

// Si no hay sesión, redirigir al login
if (!sesion) {
  window.location.href = 'login.html';
}

// ── Mostrar datos en pantalla ──
document.getElementById('perfil-nombre').textContent  = sesion.nombre;
document.getElementById('perfil-rol').textContent     = sesion.rol === 'admin' ? 'Administrador' : 'Cliente';
document.getElementById('dato-nombre').textContent    = sesion.nombre;
document.getElementById('dato-email').textContent     = sesion.email;
const tel = sesion.telefono || 'No registrado';
document.getElementById('dato-tel').textContent = tel.replace('+569', '+56 9 ').replace(/(\d{4})(\d{4})/, '$1 $2');
document.getElementById('dato-rol').textContent       = sesion.rol === 'admin' ? 'Administrador' : 'Cliente';

// ── Avatar con iniciales ──
const iniciales = sesion.nombre
  .split(' ')
  .map(p => p[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();
document.getElementById('avatar-iniciales').textContent = iniciales;

// ── Cerrar sesión ──
document.getElementById('btn-cerrar').addEventListener('click', () => {
  sessionStorage.removeItem('calcol_sesion');
  localStorage.removeItem('calcol_sesion');
  window.location.href = 'index.html';
});

// ── Eliminar cuenta ──
const modalOverlay = document.getElementById('modal-overlay');

document.getElementById('btn-eliminar').addEventListener('click', () => {
  modalOverlay.classList.add('visible');
});

document.getElementById('btn-cancelar').addEventListener('click', () => {
  modalOverlay.classList.remove('visible');
});

document.getElementById('btn-confirmar-eliminar').addEventListener('click', () => {
  const usuarios = JSON.parse(localStorage.getItem('calcol_usuarios') || '[]');
  const nuevos   = usuarios.filter(u => u.email !== sesion.email);
  localStorage.setItem('calcol_usuarios', JSON.stringify(nuevos));

  sessionStorage.removeItem('calcol_sesion');
  localStorage.removeItem('calcol_sesion');

  window.location.href = 'index.html';
});

// Cerrar modal al hacer clic fuera
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('visible');
});