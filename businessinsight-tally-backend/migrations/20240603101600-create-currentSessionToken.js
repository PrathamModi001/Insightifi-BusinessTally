module.exports = {
  // add column only
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'currentSessionToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  // remove column only
  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'currentSessionToken');
  },
};
