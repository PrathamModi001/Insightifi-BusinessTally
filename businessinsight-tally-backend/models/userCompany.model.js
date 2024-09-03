import { db } from '../config/db-config.js';
import { DataTypes } from 'sequelize';
import { User } from './user.model.js';
import { Company } from './company.model.js';

export const UserCompany = db.define(
  'UserCompany',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    company: {
      // Changed the attribute name to avoid collision
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'usercompany',
  }
);

UserCompany.belongsTo(User, {
  foreignKey: 'user',
  targetKey: 'id',
});

UserCompany.belongsTo(Company, {
  foreignKey: 'company',
  targetKey: 'id',
});
