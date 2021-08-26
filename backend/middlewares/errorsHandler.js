/* eslint-disable quotes */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */

const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "Произошла ошибка на сервере" : message,
  });
  next();
};

module.exports = errorsHandler;
