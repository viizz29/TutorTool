'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Students', // table name
        'phone', // new field name
        {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Students',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Students', 'phone'),
      queryInterface.removeColumn('Students', 'email'),
    ]);
  }
};
