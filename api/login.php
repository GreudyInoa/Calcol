<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);

$email    = $datos['email']    ?? '';
$password = $datos['password'] ?? '';

// Validaciones
if (!$email || !$password) {
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}

// Buscar usuario
$stmt = $pdo->prepare('SELECT * FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
$usuario = $stmt->fetch();

if (!$usuario) {
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
    exit;
}

// Verificar contraseña
if (!password_verify($password, $usuario['password'])) {
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
    exit;
}

echo json_encode([
    'success' => true,
    'mensaje' => 'Login exitoso',
    'usuario' => [
        'id'       => $usuario['id'],
        'nombre'   => $usuario['nombre'],
        'email'    => $usuario['email'],
        'telefono' => $usuario['telefono'],
        'rol'      => $usuario['rol']
    ]
]);
?>