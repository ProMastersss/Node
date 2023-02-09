import { createHash } from 'crypto';
import { model, Schema } from 'mongoose';
import Task from './task.js';

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
});

user.methods.changePassword = async function (password) {
  const hashPass = generateHashPassword(password);
  await this.update({ password: hashPass });
  this.password = hashPass;
};

user.methods.countTasks = async function () {
  return await Task.find({ user: this }).countDocuments();
};

user.methods.setAvatar = async function (avatar) {
  await this.update({ avatar });
};

export const generateHashPassword = function (password) {
  const hash = createHash('sha256');
  hash.update(password);

  return hash.digest('hex');
};

export default model('users', user);
