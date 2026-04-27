const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Definimos las rutas y las enlazamos con las funciones del controlador
router.get('/', productosController.obtenerProductos);
router.post('/', productosController.crearProducto);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;