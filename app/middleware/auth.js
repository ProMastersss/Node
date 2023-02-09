const setAuthMiddleware = function (req, res, next) {
  if (req.session.user) {
    res.locals.isAuth = true;
  } else {
    res.locals.isAuth = false;
  }

  res.locals.csrf = req.csrfToken();
  next();
};

const isAuthenticatedMiddleware = (req, res, next) => {
  if (req.session.user) {
    res.locals.isAuth = true;
    next();
  } else {
    res.locals.isAuth = false;
    res.redirect('/');
  }
};

export { isAuthenticatedMiddleware, setAuthMiddleware };
