require('rootpath')();
const express = require("express");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require('./utilities/jwt');

const port = process.env.PORT || 4000;
dotenv.config();
const app = express();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to DB")
})

app.use(express.json());
// use JWT auth to secure the api
// app.use(jwt());
app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => console.log(`listening to port ${port}`));