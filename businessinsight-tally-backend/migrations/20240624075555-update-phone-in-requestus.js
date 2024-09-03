'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('request_us', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('request_us', 'phone', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
