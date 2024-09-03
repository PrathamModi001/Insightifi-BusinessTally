module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'lastLogin', {
      type: Sequelize.DATE,
      allowNull: true, // Change this if lastLogin cannot be null
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('user', 'lastLogin');
  },
};
