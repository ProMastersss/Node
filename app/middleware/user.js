import User from '../models/user.js';

const userMiddleware = async function (req, res, next) {
  if (req.session.user) {
    req.user = await User.findOne(req.session.user);
  } else {
    req.user = null;
  }

  next();
};

export { userMiddleware };
