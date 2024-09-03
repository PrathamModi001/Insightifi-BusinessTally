
/**
 * Database configuration for development environment.
 * Uses environment variables for username, password, database name, host, and dialect.
 */
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    host: process.env.DB_HOST_LOCAL,
    dialect: process.env.DIALECT
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD_STAG,
    database: process.env.DB_NAME_STAG,
    host: process.env.DB_HOST_STAG,
    dialect: process.env.DIALECT
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DIALECT
  },
};