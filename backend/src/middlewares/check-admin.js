/**
 * Middleware to check if user is admin
 * Must be used after authenticateToken
 */

const checkAdmin = (req, res, next) => {
  // res.locals.user is set by authenticateToken middleware
  if (!res.locals.user) {
    return res.status(401).json({message: 'Authentication required'});
  }

  if (res.locals.user.role !== 'admin') {
    return res.status(403).json({message: 'Admin access required'});
  }

  next();
};

export {checkAdmin};
