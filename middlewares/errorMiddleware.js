const { constants } = require('../constants');

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'Validation Failed',
        message: error.message,
        stack: error.stack,
      });
      break;
    case constants.UNAUTHORISED:
      res.json({
        title: 'Unauthorized',
        message: error.message,
        stack: error.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: 'Forbidden',
        message: error.message,
        stack: error.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: error.message,
        stack: error.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: error.message,
        stack: error.stack,
      });
      break;
    default:
      console.log('No Error, All good !');
      break;
  }
};

module.exports = errorHandler;
