import { Company } from '../models/company.model.js';
import { db } from '../config/db-config.js';
import { UserCompany } from '../models/userCompany.model.js';
import { User } from '../models/user.model.js';
import { Op } from 'sequelize';
import { getCurrentDate, getDaysAgo } from '../utils/helper.js';

export const CompanyDao = {
  create,
  getCompanyByOrganizationId,
  getCompanyByuserId,
  findCompany,
  findEmployee,
  findCountEmployee,
  updateCompany,
  getCompanyCountByOrganizationId,
  getCompany,
  getCompanyCount,
  findCompanyById,
  dashboardCompanyCount,
  getActiveUsersByOrganization,
  getUnactiveUsersByOrganization,
  getCompanyIdArrayByOrganization,
};

async function create(payload) {
  const newCreate = new Company(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompany(name, limit, pageNo) {
  const offset = (pageNo - 1) * limit;

  return await Company.findAll({
    attributes: ['id', 'name'],
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
    limit: limit,
    offset: offset,
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyCount(name) {
  return await Company.count({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  })
    .then(async (count) => count)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyByOrganizationId(
  isApproved,
  OrganizationId,
  name,
  limit,
  pageNo
) {
  let query = `SELECT
                u.id AS user_id,
                u.firstname AS user_firstname,
                u.lastname AS user_lastname,
                u.email AS user_email,
                u.role AS user_role,
                c.id AS company_id,
                c.name AS company_name,
                c.city AS company_city,
                c.state AS company_state,
                c."isApproved" AS isApproved,
                c."url" AS company_url,
                CASE 
                    WHEN COUNT(pb.id) = 0 THEN '[]'::json
                    ELSE json_agg(json_build_object('id', pb.id, 'dashboard', pb.dashboard, 'isActive', pb."isActive"))
                END AS powerBidashboard
            FROM
                "user" u
            JOIN
                usercompany uc ON u.id = uc.user
            JOIN
                company c ON uc.company = c.id
            LEFT JOIN
                powerbi_dashboards pb ON c.id = pb.company
            WHERE
                (c.name ILIKE '%${name}%' OR u.email ILIKE '%${name}%') -- Match company name or user email
                AND c.organization = ${OrganizationId} -- Replace with the actual organization ID
                AND c."isApproved" = ${isApproved} -- Replace with the actual approval status
                AND u.role = 'companyAdmin'
                AND u."deletedAt" IS NULL
            GROUP BY
                u.id,
                c.id
            LIMIT
                ${limit}
            OFFSET
                ${limit * (pageNo - 1)};`;
  return await db
    .query(query, { type: db.QueryTypes.SELECT })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyCountByOrganizationId(
  isApproved,
  OrganizationId,
  name
) {
  let query = `SELECT
                  COUNT(*)
              FROM
                  "user" u
              JOIN
                  usercompany uc ON u.id = uc.user
              JOIN
                  company c ON uc.company = c.id
              WHERE
                  (c.name ILIKE '%${name}%' OR u.email ILIKE '%${name}%') -- Match company name or user email
                  AND c.organization = ${OrganizationId} -- Replace with the actual organization ID
                  AND c."isApproved" = ${isApproved}
                  AND u.role = 'companyAdmin'
                  AND u."deletedAt" IS NULL
                  ;`;

  return await db
    .query(query, { type: db.QueryTypes.SELECT })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyByuserId(isApproved, userId) {
  return await UserCompany.findAll({
    where: {
      user: userId,
    },
    attributes: {
      exclude: ['id', 'user', 'company', 'createdAt', 'updatedAt'],
    },
    include: {
      model: Company,
      where: { isApproved },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function dashboardCompanyCount(organizationId) {
  return await Company.count({
    where: {
      organization: organizationId,
    },
  });
}

async function findCompany(userId) {
  return await UserCompany.findOne({
    where: {
      user: userId,
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findCompanyById(company_id) {
  return await Company.findOne({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    where: {
      id: company_id,
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findEmployee(companyId, name, limit, offset) {
  return await UserCompany.findAll({
    attributes: [],
    where: {
      company: companyId,
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password', 'otp', 'createdAt', 'updatedAt'],
        },
        where: {
          // only show users who have deletedAt as null
          deletedAt: null,
          [Op.or]: [
            { firstname: { [Op.iLike]: `%${name}%` } },
            { lastname: { [Op.iLike]: `%${name}%` } },
          ],
        },
      },
    ],
    limit: limit,
    offset: offset,
  });
}

async function findCountEmployee(companyId, name) {
  return await UserCompany.findAndCountAll({
    attributes: [],
    where: {
      company: companyId,
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

async function getCompanyIdArrayByOrganization(organizationId) {
  const companies = await Company.findAll({
    attributes: [[db.literal('array_agg(id)'), 'ids']],
    where: {
      organization: organizationId,
    },
    raw: true,
  });
  return companies;
}
async function getActiveUsersByOrganization(companyIdarray) {
  return await UserCompany.count({
    attributes: [],
    where: {
      company: companyIdarray, // Filter by specified company IDs
    },
    include: [
      {
        model: User,
        attributes: [],
        where: {
          lastLogin: {
            [Op.gte]: getDaysAgo(15),
            [Op.lt]: getCurrentDate(),
          },
        },
      },
    ],
  });
}
async function getUnactiveUsersByOrganization(companyIdArray) {
  return await UserCompany.count({
    attributes: [],
    where: {
      company: companyIdArray, // Filter by specified company IDs
    },
    include: [
      {
        model: User,
        attributes: [],
        where: {
          lastLogin: {
            [Op.lt]: getDaysAgo(15),
          },
        },
      },
    ],
  });
}

async function updateCompany(company, id) {
  return await Company.update(company, { where: { id } }, { returning: true })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
