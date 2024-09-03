import { RequestUs } from '../models/request_us.model.js';

const create = async (payload) => {
  const newRequest = new RequestUs(payload);
  return await newRequest
    .save()
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

const findById = async (id) => {
  return await RequestUs.findOne({
    where: {
      id,
    },
  });
};

const updateStatus = async (user, id) => {
  return await RequestUs.update(user, { where: { id }, returning: true })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};

const allRequestDemo = async () => {
  return await RequestUs.findAll()
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
export const RequestUsDao = {
  create,
  findById,
  updateStatus,
  allRequestDemo,
};
