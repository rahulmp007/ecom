const authorizeRoles = (roles) => {
  console.log(`roles`, roles);

  return (req, res, next) => {
    console.log(`user role : ${req.user.role}`);

    if (!roles.includes(req.user.role.toLowerCase())) {
      return res.status(500).json({
        messge: "user does not enough permission to complete this operation",
      });
    }
    next();
  };
};

module.exports = authorizeRoles;
