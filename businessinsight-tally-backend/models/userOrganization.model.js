import { db } from '../config/db-config.js';
import { DataTypes } from 'sequelize';
import { User } from './user.model.js';
import { Organization } from './organization.model.js';

export const UserOrganization = db.define(
  'UserOrganization',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    organization: {
      // Changed the attribute name to avoid collision
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organization,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user: {
      // Changed the attribute name to avoid collision
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'userorganization',
  }
);

UserOrganization.belongsTo(User, {
  foreignKey: 'user',
  onDelete: 'CASCADE',
});

UserOrganization.belongsTo(Organization, {
  foreignKey: 'organization',
  onDelete: 'CASCADE',
});
