<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

require_once 'conexion.php';

$datos = json_decode(file_get_contents('php://input'), true);

$usuario_id   = $datos['usuario_id']   ?? null;
$direccion    = $datos['direccion']    ?? '';
$instrucciones = $datos['instrucciones'] ?? '';
$subtotal     = $datos['subtotal']     ?? 0;
$envio        = $datos['envio']        ?? 2000;
$total        = $datos['total']        ?? 0;
$cubiertos    = $datos['cubiertos']    ?? 0;
$salsa        = $datos['salsa']        ?? 0;
$items        = $datos['items']        ?? [];

if (!$direccion || empty($items)) {
    echo json_encode(['error' => 'Faltan datos del pedido']);
    exit;
}

try {
    $pdo->beginTransaction();

    // Insertar pedido
    $stmt = $pdo->prepare('INSERT INTO pedidos 
        (usuario_id, direccion, instrucciones, subtotal, envio, total, cubiertos, salsa) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$usuario_id, $direccion, $instrucciones, $subtotal, $envio, $total, $cubiertos, $salsa]);
    
    $pedido_id = $pdo->lastInsertId();

    // Insertar detalle y actualizar stock
    foreach ($items as $item) {
        $stmt = $pdo->prepare('INSERT INTO detalle_pedidos 
            (pedido_id, producto_id, cantidad, precio_unitario, nota) 
            VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([
            $pedido_id,
            $item['producto_id'],
            $item['cantidad'],
            $item['precio'],
            $item['nota'] ?? ''
        ]);

        // Restar stock
        $stmt = $pdo->prepare('UPDATE productos SET stock = stock - ? WHERE id = ?');
        $stmt->execute([$item['cantidad'], $item['producto_id']]);

        // Marcar agotado si stock llega a 0
        $stmt = $pdo->prepare('UPDATE productos SET agotado = 1 WHERE id = ? AND stock <= 0');
        $stmt->execute([$item['producto_id']]);

        // Registrar en inventario
        $stmt = $pdo->prepare('INSERT INTO inventario (producto_id, tipo, cantidad, motivo) VALUES (?, "salida", ?, ?)');
        $stmt->execute([$item['producto_id'], $item['cantidad'], 'Pedido #' . $pedido_id]);
    }

    $pdo->commit();

    echo json_encode([
        'success'   => true,
        'mensaje'   => 'Pedido creado correctamente',
        'pedido_id' => $pedido_id
    ]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['error' => 'Error al crear el pedido: ' . $e->getMessage()]);
}
?>