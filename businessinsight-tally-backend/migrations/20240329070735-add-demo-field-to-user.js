module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'demo', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'demo');
  },
};
