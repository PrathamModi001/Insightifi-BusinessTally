// import { Organization } from "../models/organization.model.js";
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { userRoles, getCurrentDate, getDaysAgo } from '../utils/helper.js';
import { Op } from 'sequelize';

export const UserDao = {
  create,
  findByEmail,
  updateUser,
  findById,
  findAll,
  deleteById,
  dashBoardOrganizationCount,
  dashBoardCompanyCount,
  getOrganizationLastLoginCount,
  getOrganizationLastLoginUnactiveCount,
  getCompanyLastLoginCount,
  getCompanyUnactiveLastLoginCount,
};

async function create(payload) {
  const hashPassword = await bcrypt.hash(`${payload.password}`, 10);
  payload.password = hashPassword;
  const newCreate = new User(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findByEmail(email) {
  return await User.findOne({ where: { email } })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function updateUser(user, id) {
  return await User.update(user, { where: { id } }, { returning: true })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findById(id) {
  return await User.findOne({
    where: { id },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

// findAll
async function findAll(role) {
  return await User.findAll({
    where: { role },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function deleteById(id) {
  return await User.destroy({ where: { id } })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function dashBoardOrganizationCount() {
  return await User.count({
    where: {
      role: [userRoles.organizationAdmin],
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getOrganizationLastLoginCount() {
  return await User.count({
    where: {
      role: [userRoles.organizationAdmin],
      lastLogin: {
        [Op.gte]: getDaysAgo(15),
        [Op.lt]: getCurrentDate(),
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function getOrganizationLastLoginUnactiveCount() {
  return await User.count({
    where: {
      role: [userRoles.organizationAdmin],
      lastLogin: {
        [Op.lt]: getDaysAgo(15),
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function dashBoardCompanyCount() {
  return await User.count({
    where: {
      role: [userRoles.companyAdmin],
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyLastLoginCount() {
  return await User.count({
    where: {
      role: [userRoles.companyAdmin],
      lastLogin: {
        [Op.gte]: getDaysAgo(15),
        [Op.lt]: getCurrentDate(),
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function getCompanyUnactiveLastLoginCount() {
  return await User.count({
    where: {
      role: [userRoles.companyAdmin],
      lastLogin: {
        [Op.lt]: getDaysAgo(15),
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
