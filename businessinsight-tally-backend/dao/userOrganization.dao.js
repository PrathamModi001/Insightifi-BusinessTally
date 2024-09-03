import { Organization } from '../models/organization.model.js';
import { UserOrganization } from '../models/userOrganization.model.js';
import { userRoles } from '../utils/helper.js';
import { db } from '../config/db-config.js';

export const UserOrganizationDao = {
  create,
  findByUserId,
  findOrganizationUser,
  findOrganizationUserCount,
};

async function create(payload) {
  const newCreate = new UserOrganization(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function findByUserId(user) {
  return await UserOrganization.findOne({
    where: { user },
    include: [
      {
        model: Organization,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function findOrganizationUser(name, limit, offset) {
  const query = `
      SELECT 
        u.id AS user_id, u.email, u.firstname, u.lastname, o.id AS organization_id, o."isApproved",
     (
      SELECT ARRAY_AGG(c.id)
      FROM "user" u2
      JOIN usercompany uc ON u2.id = uc."user"
      JOIN company c ON uc.company = c.id
      WHERE c.organization = o.id
      AND c."isApproved" = true
      AND u2.role = 'companyAdmin'
    ) AS companies_id,
    (
      SELECT COUNT(*)
      FROM "user" u2
      JOIN usercompany uc ON u2.id = uc."user"
      JOIN company c ON uc.company = c.id
      WHERE c.organization = o.id
      AND c."isApproved" = true
      AND u2.role = 'companyAdmin'
    ) AS company_count
      FROM 
        "user" u
      JOIN 
        "userorganization" uo ON u.id = uo.user
      JOIN 
        "organization" o ON uo.organization = o.id
      WHERE 
        u.role = :role
        AND (u.firstname ILIKE :name OR u.lastname ILIKE :name)
      LIMIT :limit
      OFFSET :offset`;

  return await db
    .query(query, {
      type: db.QueryTypes.SELECT,
      replacements: {
        role: userRoles.organizationAdmin,
        name: `%${name}%`, // Prepend and append '%' for pattern matching
        limit: limit,
        offset: offset,
      },
    })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
async function findOrganizationUserCount(name) {
  const query = `
      SELECT 
          COUNT(*)
      FROM
        "user" u
      JOIN 
        "userorganization" uo ON u.id = uo.user
      JOIN 
        "organization" o ON uo.organization = o.id
      WHERE 
        u.role = :role
        AND (u.firstname ILIKE :name OR u.lastname ILIKE :name)`;

  return await db
    .query(query, {
      type: db.QueryTypes.SELECT,
      replacements: {
        role: userRoles.organizationAdmin,
        name: `%${name}%`,
      },
    })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
