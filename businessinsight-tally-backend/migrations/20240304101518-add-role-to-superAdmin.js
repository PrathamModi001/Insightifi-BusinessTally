module.exports = {
  async up(queryInterface) {
    // Update existing 'role' column default value to 'superAdmin'
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_user_role" ADD VALUE IF NOT EXISTS 'superAdmin';
    `);
  },

  async down(queryInterface, Sequelize) {
    // Revert 'role' column default value back to 'organizationAdmin'
    await queryInterface.changeColumn('user', 'role', {
      type: Sequelize.ENUM(
        'organizationAdmin',
        'organizationEmployee',
        'companyAdmin',
        'companyEmployee'
      ),
      defaultValue: 'organizationAdmin',
      allowNull: false,
    });
  },
};
