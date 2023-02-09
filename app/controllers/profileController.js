import { validationResult } from 'express-validator';
import helpers from '../helpers/profile.js';
import { fileMiddleware } from '../middleware/files.js';
import User, { generateHashPassword } from '../models/user.js';

const index = async (req, res) => {
  const tasksCount = await req.user.countTasks();

  res.render('pages/profile/index', {
    title: 'Профиль',
    user: req.user,
    tasksCount,
    messages: req.flash('success'),
    errors: req.flash('errorProfile'),
    helpers,
  });
};

const changePassword = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errorProfile', errors.array()[0].msg);
    return res.redirect('/profile');
  }

  try {
    req.user.changePassword(req.body.password);
    req.flash('success', 'Пароль успешно изменен');
  } catch (e) {
    req.flash('errorProfile', e.message);
  }

  res.redirect('/profile');
};

const uploadAvatar = (req, res) => {
  fileMiddleware(req, res, function (err) {
    // Появляется ошибка busboy: Error: Unexpected end of form
    //console.log(err);
  });

  req.user.setAvatar(req.file.filename);
  req.flash('success', 'Аватар успешно загружен');
  res.redirect('/profile');
};

const registrationPage = (req, res) => {
  res.render('pages/profile/registration', {
    title: 'Регистрация',
    email: req.body.email,
    error: req.flash('error'),
  });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array()[0].msg);
    res.redirect(307, '/profile/registration');
  } else {
    await User.create({
      ...req.body,
      password: generateHashPassword(password),
    });

    req.flash('success', `Вы успешно зарегистрировались ${email}`);
    res.redirect('/');
  }
};

const login = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errorLogin', errors.array()[0].msg);
    return res.redirect('/');
  }

  req.session.regenerate(async function (err) {
    if (err) {
      next(err);
    }

    const { email, password } = req.body;

    try {
      req.session.user = await User.findOne({
        email,
        password: generateHashPassword(password),
      });
    } catch (e) {
      console.error(e);
    }

    if (req.session.user) {
      req.session.save(function (err) {
        if (err) {
          next(err);
        }

        res.redirect('/tasks');
      });
    } else {
      req.flash('errorLogin', 'Неверный email или пароль');
      res.redirect('/');
    }
  });
};

const logout = (req, res) => {
  req.user = null;
  req.session.save(function (err) {
    if (err) {
      next(err);
    }

    req.session.destroy(function (err) {
      if (err) {
        next(err);
      }

      res.redirect('/');
    });
  });
};

export {
  index,
  registrationPage,
  changePassword,
  uploadAvatar,
  register,
  login,
  logout,
};
