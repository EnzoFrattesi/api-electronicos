const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Público (listar productos)
router.get('/', productosController.obtenerProductos);

// Protegidos (solo con token)
router.post('/', authMiddleware, productosController.crearProducto);
router.delete('/:id', authMiddleware, productosController.eliminarProducto);

module.exports = router;