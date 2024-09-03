import { ContactUs } from '../models/contact-us.model.js';

export const ContactUsDao = {
  create,
};

async function create(payload) {
  const newCreate = new ContactUs(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}
