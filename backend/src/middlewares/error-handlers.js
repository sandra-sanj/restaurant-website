import {validationResult} from 'express-validator';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

/**
 * Generic input validation error handler
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validationErrors = async (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  const errors = validationResult(req);
  //console.log('validator', req.body, errors);
  // check if any validation errors
  if (!errors.isEmpty()) {
    console.error('Validation errors:', errors.array());

    const formattedErrors = {};
    errors.array().forEach((err) => {
      formattedErrors[err.path] = err.msg;
    });

    return res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
  next();
};

export {notFoundHandler, errorHandler, validationErrors};
