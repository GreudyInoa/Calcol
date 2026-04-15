/* =============================================
   NAVBAR.JS — Calcol
   Detecta sesión activa y cambia el botón
   Login por ícono + nombre del usuario
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const btnNav = document.querySelector('.btn-nav-cta');
  if (!btnNav) return;

  const sesion =
    JSON.parse(sessionStorage.getItem('calcol_sesion')) ||
    JSON.parse(localStorage.getItem('calcol_sesion')) ||
    null;

  // Detecta si estamos en pages/ o en la raíz
  const enPages = window.location.pathname.includes('/pages/');
  const base    = enPages ? '../' : '';

  if (sesion && sesion.nombre) {
    // Usuario logueado → mostrar ícono + nombre
    btnNav.innerHTML = `
      <img src="${base}Imagenes/General/icono-perfil.png" alt="perfil" class="icono-nav" width="22" height="22"/>
      Hola, ${sesion.nombre}
    `;
    btnNav.href  = `${base}perfil.html`;
    btnNav.title = 'Ver mi perfil';
    btnNav.classList.add('logueado');
  } else {
    // Sin sesión → botón Login normal
    btnNav.innerHTML = 'Login';
    btnNav.href      = `${base}login.html`;
    btnNav.classList.remove('logueado');
  }
});