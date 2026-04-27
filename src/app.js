const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes'); // <-- Importación

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a la API de Tienda de Electrónicos!' });
});

app.use('/productos', productosRoutes); // <-- Uso de la ruta (DEBE IR ANTES DEL EXPORT)

module.exports = app;