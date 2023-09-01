const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require("../utilities/validation")

router.post("/register", async (req, res) => {

  // Request Data Validation
  const { error, value } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Search Data/User in Database
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) return res.status(409).send("Email Already Exists");

  // Hash Password
  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id })
  }
  catch (err) {
    res.status(500).send(err);
  }
});

router.get("/login", async (req, res) => {

  // Request Data Validation
  const { error, value } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Search Data/User in Database
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) return res.status(400).send("Email not Registered");

  // Validate Password
  const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
  if (!validPassword) return res.status(400).send("Wrong Password");

  // Create a JWT Token
  const token = jwt.sign({ sub: existingUser._id, role: ["AGENCY_OWNER"] }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
  if (token) {
    return res.header("auth-token", token).send(token);
  }
  res.status(500).send("Logged in")
})

module.exports = router;