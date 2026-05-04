const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productosRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: '¡Bienvenido a la API de Tienda de Electrónicos!' });
});

app.use('/productos', productosRoutes);
app.use('/auth', authRoutes);

module.exports = app;