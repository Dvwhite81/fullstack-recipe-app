const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']?.split(' ')[1];

  if (!token) {
    return res.json({
      success: false,
      isLoggedIn: false,
      message: 'Incorrect token',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        isLoggedIn: false,
        message: 'Failed to authenticate token',
      });
    }

    req.user = {};
    req.user.id = decoded.id;
    req.user.username = decoded.username;
    req.user.recipes = decoded.recipes;
    next();
  });
};

module.exports = {
  verifyJWT,
};
