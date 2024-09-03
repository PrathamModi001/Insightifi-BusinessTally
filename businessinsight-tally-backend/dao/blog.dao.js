import { Blog } from '../models/blog.model.js';

export const BlogDao = {
  create,
  findAll,
  findOne,
  update,
};

async function create(payload) {
  const newCreate = new Blog(payload);
  return await newCreate
    .save()
    .then(async (res) => res)
    .catch((err) => {
      throw err;
    });
}

async function findAll() {
  return await Blog.findAll();
}

async function findOne(id) {
  return await Blog.findOne({ where: { id } });
}

async function update(id, payload) {
  return await Blog.update(payload, { where: { id } });
}
