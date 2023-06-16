const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (error, authData) => {
      if (error) {
        res.status(403);
        throw new Error('Token not valid');
      } else {
        req.user_id = authData.user.id;
        next();
      }
    });
  } else {
    res.status(403);
    throw new Error('User not authorised');
  }
}

module.exports = verifyToken;
