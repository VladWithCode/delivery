module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  return res.status(403).json({
    status: 'AUTH_REQUIRED',
    message: 'No autorizado',
  });
};
