import { Router } from 'express';

const router = new Router();

const homeRoute = router.get('/', (req, res) => {
  res.render('index', {
    title: 'Task Manager',
    user: req.user,
    message: req.flash('success'),
    errorLogin: req.flash('errorLogin'),
  });
});

export { homeRoute };
