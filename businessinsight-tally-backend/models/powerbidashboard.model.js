import { db } from '../config/db-config.js';
import { DataTypes } from 'sequelize';
import { Company } from './company.model.js';

export const PowerBiDashboards = db.define(
  'PowerBiDashboards',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dashboard: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'powerbi_dashboards',
  }
);

PowerBiDashboards.belongsTo(Company, {
  foreignKey: 'company',
});
