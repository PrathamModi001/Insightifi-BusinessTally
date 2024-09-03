// models/payment.model.js
import { db } from '../config/db-config.js';
import { DataTypes } from 'sequelize';
import { Company } from './company.model.js';
import { Organization } from './organization.model.js';
import { User } from './user.model.js';

export const Payment = db.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organization,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: 'payments' }
);

// Define the relationships between Payment and other models
Payment.belongsTo(Company, { foreignKey: 'companyId' });
Payment.belongsTo(Organization, { foreignKey: 'organizationId' });
Payment.belongsTo(User, { foreignKey: 'userId' });
