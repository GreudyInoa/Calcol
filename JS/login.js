
/* ── ELEMENTOS ── */
const tabBtns    = document.querySelectorAll('.tab-btn');
const panelLogin = document.getElementById('panel-login');
const panelReg   = document.getElementById('panel-registro');

const lEmail   = document.getElementById('l-email');
const lPass    = document.getElementById('l-pass');
const btnLogin = document.getElementById('btn-login');
const ojL      = document.getElementById('ojo-l');
const aLogin   = document.getElementById('alerta-login');
const aLoginT  = document.getElementById('alerta-login-txt');

const rNombre  = document.getElementById('r-nombre');
const rTel     = document.getElementById('r-tel');
const rEmail   = document.getElementById('r-email');
const rPass    = document.getElementById('r-pass');
const rPass2   = document.getElementById('r-pass2');
const btnReg   = document.getElementById('btn-registro');
const ojR      = document.getElementById('ojo-r');
const ojR2     = document.getElementById('ojo-r2');
const aReg     = document.getElementById('alerta-reg');
const aRegT    = document.getElementById('alerta-reg-txt');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── TABS ── */
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('activo'));
    btn.classList.add('activo');
    if (btn.dataset.tab === 'login') {
      panelLogin.classList.add('activo');
      panelReg.classList.remove('activo');
    } else {
      panelReg.classList.add('activo');
      panelLogin.classList.remove('activo');
    }
    limpiarTodo();
  });
});

/* ── OJO (toggle contraseña) ── */
function toggleOjo(btn, input) {
  btn.textContent = '👁️';
  btn.addEventListener('click', () => {
    const esPass = input.type === 'password';
    input.type   = esPass ? 'text' : 'password';
    btn.textContent = esPass ? '🙈' : '👁️';
  });
}

toggleOjo(ojL,  lPass);
toggleOjo(ojR,  rPass);
toggleOjo(ojR2, rPass2);

/* ── NOMBRE — solo letras, sin números ni símbolos ── */
rNombre.addEventListener('keypress', (e) => {
  if (!/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/.test(e.key)) e.preventDefault();
});

rNombre.addEventListener('paste', (e) => {
  e.preventDefault();
  const texto = e.clipboardData.getData('text');
  const soloLetras = texto.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '');
  rNombre.value = soloLetras;
});

/* ── TELÉFONO — solo números, máximo 9 dígitos ── */
rTel.addEventListener('keypress', (e) => {
  if (!/[0-9]/.test(e.key)) e.preventDefault();
  if (rTel.value.length >= 9) e.preventDefault();
});

rTel.addEventListener('paste', (e) => {
  e.preventDefault();
  const texto = e.clipboardData.getData('text');
  const soloNums = texto.replace(/[^0-9]/g, '').slice(0, 9);
  rTel.value = soloNums;
});

/* ── ACTIVAR BOTÓN LOGIN al escribir ── */
[lEmail, lPass].forEach(inp => inp.addEventListener('input', () => {
  const ok = lEmail.value.trim() && lPass.value.trim();
  btnLogin.classList.toggle('listo', !!ok);
  inp.classList.remove('error');
  const err = inp.closest('.form-group')?.querySelector('.err-txt');
  if (err) err.classList.remove('v');
}));

/* ── ACTIVAR BOTÓN REGISTRO al escribir ── */
[rNombre, rTel, rEmail, rPass, rPass2].forEach(inp => inp.addEventListener('input', () => {
  const ok = rNombre.value.trim()
          && rTel.value.trim().length === 9
          && rEmail.value.trim()
          && rPass.value.trim()
          && rPass2.value.trim();
  btnReg.classList.toggle('listo', !!ok);
  inp.classList.remove('error');
  const err = inp.closest('.form-group')?.querySelector('.err-txt');
  if (err) err.classList.remove('v');
}));

/* ── HELPERS ── */
function marcarError(inputEl, errId) {
  inputEl.classList.add('error');
  document.getElementById(errId).classList.add('v');
}

function mostrarAlerta(alertaEl, txtEl, msg) {
  txtEl.textContent = msg;
  alertaEl.classList.add('v');
}

function limpiarTodo() {
  document.querySelectorAll('input').forEach(i => i.classList.remove('error'));
  document.querySelectorAll('.err-txt').forEach(e => e.classList.remove('v'));
  document.querySelectorAll('.alerta').forEach(a => a.classList.remove('v'));
}

function exitoso(btn, nombre, destino) {
  btn.textContent = '✅ ¡Bienvenido, ' + nombre + '!';
  btn.classList.add('exito');
  btn.classList.remove('listo');
  setTimeout(() => { window.location.href = 'bienvenido.html'; }, 1300);
}

/* ── LOGIN con PHP ── */
async function handleLogin() {
  limpiarTodo();
  const email = lEmail.value.trim();
  const pass  = lPass.value.trim();
  let ok = true;

  if (!emailRegex.test(email)) { marcarError(lEmail, 'l-email-err'); ok = false; }
  if (!pass)                   { marcarError(lPass,  'l-pass-err');  ok = false; }
  if (!ok) return;

  try {
    const res  = await fetch('/Calcol/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();

    if (data.error) {
      mostrarAlerta(aLogin, aLoginT, data.error);
      lEmail.classList.add('error');
      lPass.classList.add('error');
      return;
    }

    sessionStorage.setItem('calcol_sesion', JSON.stringify(data.usuario));
    exitoso(btnLogin, data.usuario.nombre, 'bienvenido.html');

  } catch (e) {
    mostrarAlerta(aLogin, aLoginT, 'Error de conexión con el servidor.');
  }
}

btnLogin.addEventListener('click', handleLogin);
lPass.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

/* ── REGISTRO con PHP ── */
async function handleRegistro() {
  limpiarTodo();
  const nombre = rNombre.value.trim();
  const tel    = rTel.value.trim();
  const email  = rEmail.value.trim();
  const pass   = rPass.value.trim();
  const pass2  = rPass2.value.trim();
  let ok = true;

  if (!nombre)                 { marcarError(rNombre, 'r-nombre-err'); ok = false; }
  if (tel.length !== 9)        { marcarError(rTel,    'r-tel-err');    ok = false; }
  if (!emailRegex.test(email)) { marcarError(rEmail,  'r-email-err');  ok = false; }
  if (pass.length < 6)         { marcarError(rPass,   'r-pass-err');   ok = false; }
  if (pass !== pass2)          { marcarError(rPass2,  'r-pass2-err');  ok = false; }
  if (!ok) return;

  try {
    const res  = await fetch('/Calcol/api/registro.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password: pass, telefono: '+56' + tel })
    });
    const data = await res.json();

    if (data.error) {
      mostrarAlerta(aReg, aRegT, data.error);
      if (data.error.includes('correo')) rEmail.classList.add('error');
      return;
    }

    sessionStorage.setItem('calcol_sesion', JSON.stringify(data.usuario));
    exitoso(btnReg, data.usuario.nombre, 'bienvenido.html');

  } catch (e) {
    mostrarAlerta(aReg, aRegT, 'Error de conexión con el servidor.');
  }
}

btnReg.addEventListener('click', handleRegistro);
rPass2.addEventListener('keydown', e => { if (e.key === 'Enter') handleRegistro(); });