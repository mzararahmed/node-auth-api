const crypto = require("crypto");

module.exports = { generateRandomString }

const generateRandomString = () => {
  return crypto.randomBytes(64).toString('hex')
}