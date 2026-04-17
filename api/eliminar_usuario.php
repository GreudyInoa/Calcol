<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once 'conexion.php';

$pdo->exec('SET SQL_SAFE_UPDATES = 0');

$datos = json_decode(file_get_contents('php://input'), true);

$email = $datos['email'] ?? '';

if (!$email) {
    echo json_encode(['error' => 'Falta el correo']);
    exit;
}

$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
$usuario = $stmt->fetch();

if (!$usuario) {
    echo json_encode(['error' => 'Usuario no encontrado']);
    exit;
}

$id = $usuario['id'];

$stmt = $pdo->prepare('DELETE dp FROM detalle_pedidos dp 
    INNER JOIN pedidos p ON dp.pedido_id = p.id 
    WHERE p.usuario_id = ?');
$stmt->execute([$id]);

$stmt = $pdo->prepare('DELETE FROM pedidos WHERE usuario_id = ?');
$stmt->execute([$id]);

$stmt = $pdo->prepare('DELETE FROM usuarios WHERE id = ?');
$stmt->execute([$id]);

// Reiniciar AUTO_INCREMENT al id más bajo disponible
$pdo->exec('ALTER TABLE usuarios AUTO_INCREMENT = ' . $id);

echo json_encode(['success' => true, 'mensaje' => 'Cuenta eliminada correctamente']);
?>