module.exports = function validate(schema) {
    return (req, res, next) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (err) {
        return res.status(400).json({ message: "Invalid input", error: err.errors });
      }
    };
  };
  