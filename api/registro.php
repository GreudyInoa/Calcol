<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);

$nombre   = $datos['nombre']   ?? '';
$email    = $datos['email']    ?? '';
$password = $datos['password'] ?? '';
$telefono = $datos['telefono'] ?? '';

// Validaciones
if (!$nombre || !$email || !$password) {
    echo json_encode(['error' => 'Faltan campos obligatorios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Correo no válido']);
    exit;
}

// Verificar si el email ya existe
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['error' => 'Este correo ya está registrado']);
    exit;
}

// Encriptar contraseña
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Insertar usuario
$stmt = $pdo->prepare('INSERT INTO usuarios (nombre, email, password, telefono, rol) VALUES (?, ?, ?, ?, "cliente")');
$stmt->execute([$nombre, $email, $passwordHash, $telefono]);

echo json_encode([
    'success' => true,
    'mensaje' => 'Usuario registrado correctamente',
    'usuario' => [
        'id'     => $pdo->lastInsertId(),
        'nombre' => $nombre,
        'email'  => $email,
        'telefono' => $telefono,
        'rol'    => 'cliente'
    ]
]);
?>