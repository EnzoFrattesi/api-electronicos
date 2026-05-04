'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Ver si hay usuarios
    const [usuarios] = await queryInterface.sequelize.query(
      'SELECT id FROM "Usuarios" ORDER BY id ASC LIMIT 1;'
    );

    let usuarioId;

    if (!usuarios.length) {
      // 2. Si no hay, crear uno
      const [result] = await queryInterface.sequelize.query(
        `INSERT INTO "Usuarios" (nombre, email, password, rol, "createdAt", "updatedAt")
         VALUES ('Admin', 'admin@email.com', '$2b$10$wNaWLe5ex6rXtvpGpInWXuEE6r76pyWCdmBYn.1NFzbwE6UStv6su', 'admin', NOW(), NOW())
         RETURNING id;`
      );
      usuarioId = result[0].id;
    } else {
      usuarioId = usuarios[0].id;
    }

    // 3. Agregar columna temporalmente nullable
    await queryInterface.addColumn('Productos', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'Usuarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // 4. Asignar usuario a productos existentes
    await queryInterface.sequelize.query(
      'UPDATE "Productos" SET "usuarioId" = :usuarioId',
      { replacements: { usuarioId } }
    );

    // 5. Cambiar a NOT NULL
    await queryInterface.changeColumn('Productos', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Usuarios', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Productos', 'usuarioId');
  }
};