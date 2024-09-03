import { Payment } from '../models/payment.model.js';
import { db } from '../config/db-config.js';
import { Op } from 'sequelize';
import moment from 'moment';
import { Company } from '../models/company.model.js';

export const PaymentDao = {
  incomeMonth,
  overviewRevenue,
  getCompanyAmounts,
  getCompanyAmountsByCity,
};

async function incomeMonth(organizationId) {
  // Get the first and last day of the current month using moment
  const firstDayOfMonth = moment().startOf('month').toDate();
  const lastDayOfMonth = moment().endOf('month').toDate();

  // Find payments for the current month for the specified organizationId
  return await Payment.sum('amount', {
    where: {
      organizationId,
      createdAt: {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth],
      },
    },
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function overviewRevenue(organizationId) {
  return await Payment.findAll({
    where: {
      organizationId,
    },
    attributes: [
      [db.fn('date_trunc', 'month', db.col('createdAt')), 'month'],
      [db.fn('SUM', db.col('amount')), 'totalAmount'],
    ],
    group: ['month'],
    order: [['month', 'ASC']],
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyAmounts(organizationId) {
  return await Payment.findAll({
    where: {
      organizationId,
    },
    attributes: ['companyId', [db.fn('SUM', db.col('amount')), 'totalAmount']],
    include: [
      {
        model: Company,
        attributes: ['id', 'name'], // Specify the attributes of the Company model to include
        required: true, // Ensure that the join is treated as an inner join
      },
    ],
    group: ['companyId', 'Company.id', 'Company.name'], // Group by companyId, Company.id, and Company.name
    order: [[db.fn('SUM', db.col('amount')), 'DESC']], // Order by totalAmount DESC
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function getCompanyAmountsByCity(organizationId) {
  return await Payment.findAll({
    where: {
      organizationId,
    },
    attributes: [
      [db.literal('"Company"."city"'), 'city'], // Include the city of the company with proper table alias
      [db.fn('SUM', db.col('amount')), 'totalAmount'],
    ],
    include: [
      {
        model: Company,
        attributes: [], // Specify the attributes of the Company model to include
        required: true, // Ensure that the join is treated as an inner join
      },
    ],
    group: ['Company.city'], // Group by the city of the company
    order: [[db.fn('SUM', db.col('amount')), 'DESC']], // Order by totalAmount DESC
  })
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
