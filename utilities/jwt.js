const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
  const secret = process.env.TOKEN_SECRET
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      '/users/register',
      '/users/login',
    ]
  });
}