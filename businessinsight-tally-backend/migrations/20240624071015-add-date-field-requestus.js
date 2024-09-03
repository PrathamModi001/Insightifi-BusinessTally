'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('request_us', 'date', {
        type: Sequelize.DATE,
        allowNull: false,
      }),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('request_us', 'date')]);
  },
};
