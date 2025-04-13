const authorizeRoles = (roles) => {
  return (req, res, next) => {
    
    if (!roles.includes(req.user.role.toLowerCase())) {
      return res.status(500).json({
        messge: "user does not enough permission to complete this operation",
      });
    }
    next();
  };
};

module.exports = authorizeRoles;
