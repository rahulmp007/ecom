const errorHandler = (err, req, res, next) => {
  console.error(`Error Handler :=> ${err} `);
  const { message, statusCode } = err;

  res.status(statusCode).json({ message: message });
};

module.exports = errorHandler;
