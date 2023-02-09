const logErrorsMiddleware = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

const clientErrorHandlerMiddleware = function (err, req, res, next) {
  if (req.xhr) {
    const status = 500;
    res.status(status).send({ error: err, status });
  } else {
    next(err);
  }
};

const errorHandlerMiddleware = function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = 500;
  res.status(status);
  res.render('error', { error: err, status });
};

export {
  logErrorsMiddleware,
  clientErrorHandlerMiddleware,
  errorHandlerMiddleware,
};
