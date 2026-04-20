CREATE DATABASE  IF NOT EXISTS `calcol` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `calcol`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: calcol
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalle_pedidos`
--

DROP TABLE IF EXISTS `detalle_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` int NOT NULL,
  `nota` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedidos`
--

LOCK TABLES `detalle_pedidos` WRITE;
/*!40000 ALTER TABLE `detalle_pedidos` DISABLE KEYS */;
INSERT INTO `detalle_pedidos` VALUES (1,1,1,2,1700,''),(2,2,1,2,1700,''),(30,30,1,1,1700,'');
/*!40000 ALTER TABLE `detalle_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int NOT NULL,
  `tipo` enum('entrada','salida') NOT NULL,
  `cantidad` int NOT NULL,
  `motivo` varchar(255) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1,'salida',2,'Pedido #1','2026-04-16 17:28:42'),(2,1,'salida',2,'Pedido #2','2026-04-16 17:33:22'),(3,1,'salida',1,'Pedido #3','2026-04-17 15:43:28'),(4,1,'salida',1,'Pedido #4','2026-04-17 15:48:47'),(5,1,'salida',1,'Pedido #5','2026-04-17 15:50:33'),(6,1,'salida',1,'Pedido #6','2026-04-17 15:50:38'),(7,1,'salida',1,'Pedido #7','2026-04-17 15:57:03'),(8,1,'salida',1,'Pedido #8','2026-04-17 15:57:16'),(9,1,'salida',1,'Pedido #9','2026-04-17 15:58:02'),(10,1,'salida',1,'Pedido #10','2026-04-17 15:58:31'),(11,1,'salida',1,'Pedido #11','2026-04-17 15:58:34'),(12,1,'salida',1,'Pedido #12','2026-04-17 15:58:48'),(13,1,'salida',1,'Pedido #13','2026-04-17 15:59:15'),(14,1,'salida',1,'Pedido #14','2026-04-17 16:02:25'),(15,1,'salida',1,'Pedido #15','2026-04-17 16:02:28'),(16,1,'salida',1,'Pedido #16','2026-04-17 16:02:51'),(17,1,'salida',1,'Pedido #17','2026-04-17 16:04:16'),(18,1,'salida',1,'Pedido #18','2026-04-17 16:04:31'),(19,1,'salida',1,'Pedido #19','2026-04-17 16:13:44'),(20,1,'salida',1,'Pedido #20','2026-04-17 16:14:01'),(21,1,'salida',1,'Pedido #21','2026-04-17 16:16:36'),(22,1,'salida',1,'Pedido #22','2026-04-17 16:16:48'),(23,1,'salida',1,'Pedido #23','2026-04-17 16:31:00'),(24,1,'salida',1,'Pedido #24','2026-04-17 16:31:22'),(25,2,'salida',1,'Pedido #25','2026-04-17 16:31:35'),(26,2,'salida',1,'Pedido #26','2026-04-17 16:54:56'),(27,2,'salida',1,'Pedido #27','2026-04-17 16:55:05'),(28,1,'salida',2,'Pedido #28','2026-04-17 16:55:26'),(29,1,'salida',1,'Pedido #29','2026-04-19 01:36:31'),(30,1,'salida',1,'Pedido #30','2026-04-19 15:35:15');
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `instrucciones` text,
  `subtotal` int NOT NULL,
  `envio` int DEFAULT '2000',
  `total` int NOT NULL,
  `estado` enum('pendiente','en_proceso','listo','entregado') DEFAULT 'pendiente',
  `cubiertos` tinyint(1) DEFAULT '0',
  `salsa` tinyint(1) DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,NULL,'Primera Casa 42','frente al auto planet',3400,2000,5400,'pendiente',0,0,'2026-04-16 17:28:42'),(2,NULL,'San Pablo 8648','',3400,2000,5400,'pendiente',0,0,'2026-04-16 17:33:22'),(30,2,'San Pablo 8648','',1700,2000,3700,'pendiente',0,0,'2026-04-19 15:35:15');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` int NOT NULL,
  `categoria` enum('completos','hamburguesa','churrasco','yaroa') NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `stock` int DEFAULT '100',
  `agotado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Completo','Pan bueno, salchichón, tomate, palta y torta mayo casera.',1700,'completos','completo-pequeño.png',1,'2026-04-15 21:09:15',68,0),(2,'Completo XL','Pan bueno, salchichón, palta-Chimichurri y torta mayo casera.',1700,'completos','completo-pequeño.png',1,'2026-04-15 21:09:15',97,0),(3,'Italiano','Pan suave, salchicha, tomate fresco, palta y harta mayo casera.',1700,'completos','completo-italino-pequeño.png',1,'2026-04-15 21:09:15',100,0),(4,'Italiano XL','Pan suave, salchicha, tomate fresco, palta y harta mayo casera.',1700,'completos','completo-italino-pequeño.png',1,'2026-04-15 21:09:15',100,0),(5,'As Queso','Pan, vienesa, salchicha y queso derretido.',1700,'completos','completo-As-pequeño.png',1,'2026-04-15 21:09:15',100,0),(6,'As Queso XL','Pan, vienesa, salchicha y queso derretido.',1700,'completos','completo-As-pequeño.png',1,'2026-04-15 21:09:15',100,0),(7,'Churrasco','Pan, carne jugosa, tomate, palta y mayo casera.',2500,'churrasco','churrasco-italiano.webp',1,'2026-04-15 21:09:15',100,0),(8,'Churrasco XL','Pan, carne jugosa extra, tomate, palta y mayo casera.',3000,'churrasco','churrasco-italiano.webp',1,'2026-04-15 21:09:15',100,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('admin','cliente') DEFAULT 'cliente',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','admin@calcol.cl','admin123','+56912345678','admin','2026-04-15 21:09:15'),(2,'Greudy Inoa','greudyinoa29@gmail.com','$2y$10$x4nOduUfqtKL5IBAC7y9QeK9UwGqesK/BcQe5enY4zyf4gcDR.0pO','+56911111111','cliente','2026-04-19 15:31:22');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-19 13:23:53
