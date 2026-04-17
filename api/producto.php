<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once 'conexion.php';

$categoria = $_GET['categoria'] ?? '';

if ($categoria) {
    $stmt = $pdo->prepare('SELECT * FROM productos WHERE categoria = ? AND agotado = 0');
    $stmt->execute([$categoria]);
} else {
    $stmt = $pdo->prepare('SELECT * FROM productos');
    $stmt->execute();
}

$productos = $stmt->fetchAll();

echo json_encode([
    'success'   => true,
    'productos' => $productos
]);
?>