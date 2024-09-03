import { Company } from '../models/company.model.js';
import { PowerBiDashboards } from '../models/powerbidashboard.model.js'; // Corrected model name
import { Op } from 'sequelize';

export const PowerBiDashboardsDao = {
  create,
  getByCompanyId,
  getByCompanyIdCount,
  getByOrganizationId,
  getByOrganizationIdCount,
  getListCompanyPowerbi,
  getListCompanyPowerbiCount,
  findCompany,
  updatePowerBiDashboard,
  deletePowerBiDashboard,
  findPowerBiDashboard,
  findBiDashId,
};

async function create(payload) {
  const newPowerbi = new PowerBiDashboards(payload);
  return await newPowerbi
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getByCompanyId(isActive, companyId, pageNo, limit) {
  const offset = (pageNo - 1) * limit;
  return PowerBiDashboards.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { company: companyId, isActive: isActive },
    limit: limit,
    offset: offset,
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getByCompanyIdCount(isActive, companyId) {
  return await PowerBiDashboards.count({
    where: { company: companyId, isActive: isActive },
  })
    .then(async (count) => count)
    .catch((err) => {
      throw err;
    });
}

async function findCompany(companyId) {
  return PowerBiDashboards.findOne({
    where: { company: companyId },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findPowerBiDashboard(id) {
  return PowerBiDashboards.findOne({
    where: { id },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findBiDashId(dashboard) {
  return PowerBiDashboards.findOne({
    where: { dashboard },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function deletePowerBiDashboard(id) {
  return PowerBiDashboards.destroy({
    where: { id },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getListCompanyPowerbi(isActive, name, pageNo, limit) {
  const offset = (pageNo - 1) * limit;

  return await PowerBiDashboards.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt columns
    where: { isActive: isActive },
    include: [
      {
        model: Company,
        attributes: {
          exclude: ['organization', 'createdAt', 'updatedAt'],
        },
        where: {
          name: { [Op.iLike]: `%${name}%` },
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

async function getListCompanyPowerbiCount(isActive, name) {
  return await PowerBiDashboards.count({
    where: { isActive: isActive },
    include: [
      {
        model: Company,
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        attributes: [],
      },
    ],
  })
    .then(async (count) => count)
    .catch((err) => {
      throw err;
    });
}

async function getByOrganizationId(isActive, organizationId, pageNo, limit) {
  const offset = (pageNo - 1) * limit;

  return await PowerBiDashboards.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] }, // Exclude createdAt and updatedAt columns
    where: { isActive: isActive },
    include: [
      {
        model: Company,
        where: {
          organization: organizationId,
        },
        attributes: [],
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

async function getByOrganizationIdCount(isActive, organizationId) {
  return await PowerBiDashboards.count({
    where: { isActive: isActive },
    include: [
      {
        model: Company,
        where: {
          organization: organizationId,
        },
        attributes: [],
      },
    ],
  })
    .then(async (count) => count)
    .catch((err) => {
      throw err;
    });
}

async function updatePowerBiDashboard(id, dashboard) {
  return await PowerBiDashboards.update(
    dashboard,
    { where: { id } },
    { returning: true }
  )
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
