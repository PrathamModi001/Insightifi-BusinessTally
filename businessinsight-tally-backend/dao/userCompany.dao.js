import { Company } from '../models/company.model.js';
import { UserCompany } from '../models/userCompany.model.js';

export const UserCompanyDao = {
  create,
  findByUserId,
  findByUserIdCompany,
};

async function create(payload) {
  const newCreate = new UserCompany(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findByUserId(user) {
  return await UserCompany.findOne({
    where: { user },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findByUserIdCompany(user) {
  return await UserCompany.findOne({
    where: { user },
    include: [
      {
        model: Company,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
