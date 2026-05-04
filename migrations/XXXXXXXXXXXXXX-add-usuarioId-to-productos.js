'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Obtener un usuario existente
    const [usuarios] = await queryInterface.sequelize.query(
      'SELECT id FROM "Usuarios" ORDER BY id ASC LIMIT 1;'
    );

    if (!usuarios.length) {
      throw new Error('No hay usuarios en la tabla Usuarios. Crea uno antes de migrar.');
    }

    const usuarioId = usuarios[0].id;

    // 2. Agregar columna permitiendo null temporalmente
    await queryInterface.addColumn('Productos', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // 3. Asignar usuario a productos existentes
    await queryInterface.sequelize.query(
      'UPDATE "Productos" SET "usuarioId" = :usuarioId',
      { replacements: { usuarioId } }
    );

    // 4. Hacer la columna NOT NULL
    await queryInterface.changeColumn('Productos', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Productos', 'usuarioId');
  }
};