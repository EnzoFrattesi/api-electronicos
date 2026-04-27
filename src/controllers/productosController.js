const { Producto } = require('../../models'); // Importamos el modelo

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    // req.body contiene los datos enviados por el usuario (nombre, marca, precio, stock)
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Eliminar un producto por ID
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.destroy({ where: { id } });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  eliminarProducto
};