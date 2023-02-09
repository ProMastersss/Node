import mongoose from 'mongoose';
import { DATABASE_NAME, MONGO_URI } from '../config/test.js';
import User, { generateHashPassword } from '../models/user.js';

describe('User', () => {
  let user;

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
  });

  afterAll(async () => {
    await User.deleteOne(user);
    await mongoose.disconnect();
  });

  test('should register', async () => {
    const userDB = await User.findOne(user);

    expect(user).toBeInstanceOf(User);
    expect(userDB).toBeInstanceOf(User);
    expect(userDB.name).toBe('test');
  });

  test('should change password', async () => {
    const pass = '222';
    const hashPass = generateHashPassword(pass);

    await user.changePassword(pass);

    expect(user.password).toBe(hashPass);
  });
});
