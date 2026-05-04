const { Producto } = require('../../models');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto (con usuarioId)
const crearProducto = async (req, res) => {
  try {
    const { nombre, marca, precio, stock } = req.body;

    const nuevoProducto = await Producto.create({
      nombre,
      marca,
      precio,
      stock,
      usuarioId: req.usuario.id
    });

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