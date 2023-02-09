import mongoose from 'mongoose';
import { DATABASE_NAME, MONGO_URI } from '../config/test.js';
import Task from '../models/task.js';
import User, { generateHashPassword } from '../models/user.js';

describe('User', () => {
  let user;
  let task;

  beforeAll(async () => {
    try {
      mongoose.set('strictQuery', false);
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        dbName: DATABASE_NAME,
      });
    } catch (error) {
      console.log(error);
    }

    user = new User({
      name: 'test',
      email: 'test@ya.ru',
      password: generateHashPassword('111'),
    });
    await user.save();

    task = new Task({
      name: 'name',
      count: 1,
      description: 'description',
      complexity: 'easy',
      completed: true,
      user: user,
    });
    await task.save();
  });

  afterAll(async () => {
    await User.deleteOne(user);
    await Task.deleteOne(task);
    await mongoose.disconnect();
  });

  test('must have user', async () => {
    expect(await user.countTasks()).toBe(1);
  });
});
