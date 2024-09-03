import { Organization } from '../models/organization.model.js';
import { UserOrganization } from '../models/userOrganization.model.js';
import { User } from '../models/user.model.js';
import { Op } from 'sequelize';
import moment from 'moment';
import { Company } from '../models/company.model.js';
import { UserCompany } from '../models/userCompany.model.js';
import { userRoles } from '../utils/helper.js';
export const OrganizationDao = {
  create,
  findEmployee,
  findOrganization,
  findCountEmployee,
  updateOrganization,
  getUsersStatusCounts,
  findOrgSuperUser,
  findOrganizationById,
  getOrganizationByAdminEmail,
};

async function create(payload) {
  const newCreate = new Organization(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findOrgSuperUser(organizationId) {
  return await UserOrganization.findOne({
    where: {
      organization: organizationId,
    },
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'otp', 'createdAt', 'updatedAt'],
      },
      where: {
        role: userRoles.organizationAdmin,
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getOrganizationByAdminEmail(email) {
  return await User.findOne({
    where: {
      email: email,
      role: 'organizationAdmin',
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findEmployee(organizationId, name, limit, offset) {
  return await UserOrganization.findAll({
    attributes: [],
    where: {
      organization: organizationId,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'otp', 'createdAt', 'updatedAt'],
        },
        where: {
          deletedAt: null,
          [Op.or]: [
            { firstname: { [Op.like]: `%${name}%` } },
            { lastname: { [Op.like]: `%${name}%` } },
          ],
        },
      },
    ],
    limit: limit,
    offset: offset,
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findCountEmployee(organizationId, name) {
  return await UserOrganization.findAndCountAll({
    attributes: [],
    where: {
      organization: organizationId,
    },
    include: [
      {
        model: User,
        attributes: [],
        where: {
          deletedAt: null,
          [Op.or]: [
            { firstname: { [Op.like]: `%${name}%` } },
            { lastname: { [Op.like]: `%${name}%` } },
          ],
        },
      },
    ],
  })
    .then((result) => result.count)
    .catch((err) => {
      throw err;
    });
}

async function findOrganization(userId) {
  return await UserOrganization.findOne({
    where: {
      user: userId,
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findOrganizationById(organizationId) {
  return await Organization.findOne({
    where: {
      id: organizationId,
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function updateOrganization(id, organization) {
  return await Organization.update(
    organization,
    { where: { id } },
    { returning: true }
  )
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getUsersStatusCounts(organizationId) {
  // Calculate the date 15 days ago
  const fifteenDaysAgo = moment().subtract(15, 'days').toDate();

  // Find all companies under the organization
  const companies = await Company.findAll({
    where: {
      organization: organizationId,
    },
    attributes: ['id'],
  });

  // Extract the company IDs from the result
  const companyIds = companies.map((company) => company.id);

  // Find all users associated with the companies
  const users = await UserCompany.findAll({
    where: {
      company: companyIds,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'lastLogin'],
        where: {
          role: 'companyAdmin',
        },
      },
    ],
  });

  // Count the number of inactive users
  const inactiveUsers = users.filter(
    (user) => !user.User || user.User.lastLogin < fifteenDaysAgo
  ).length;

  // Count the number of active users (last login greater than 15 days ago)
  const activeUsers = users.filter(
    (user) => user.User && user.User.lastLogin >= fifteenDaysAgo
  ).length;

  const onboardUser = inactiveUsers + activeUsers;

  return {
    inactiveUsers,
    activeUsers,
    onboardUser,
  };
}
