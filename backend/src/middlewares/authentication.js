import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  //console.log('authenticateToken', req.headers);

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log('token', token);

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token', error: err});
  }
};

const optionalAuthentication = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  //const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('token authenticationista:', token);

  // If no token, proceed as guest
  if (!token) {
    return next();
  }

  // Verify token if present
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // Invalid token, still proceed as guest
    console.error('Invalid token, procceeding as guest');
    next();
  }
};
export {authenticateToken, optionalAuthentication};
