require('dotenv').config();

const app = require('./app');
const db = require('../models'); // Importamos los modelos de Sequelize

// Configuramos el puerto (Render usará process.env.PORT, localmente usamos 3000)
const PORT = process.env.PORT || 3000;

// Probamos la conexión a la base de datos y arrancamos el servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a PostgreSQL establecida con éxito.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error);
  });