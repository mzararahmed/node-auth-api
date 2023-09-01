module.exports = function (roles = []) {
  console.log("Authorizing roles")
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.body.role[0])) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // authorization successful
      next();
    }
  ];
}