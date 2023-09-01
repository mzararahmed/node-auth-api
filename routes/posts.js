const router = require("express").Router();
const authorizeRole = require("./authorizeRole");
const verifyToken = require("./verifyToken");
const Roles = require("../utilities/roles");

router.post("/", verifyToken, authorizeRole(Roles.Agency), (req, res) => {
  res.send(req.user);
});

module.exports = router;