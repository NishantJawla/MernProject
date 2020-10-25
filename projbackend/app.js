require('dotenv').config();
const { Mongoose } = require("mongoose");

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
return 	res.send("Welcome to Home Page!");
});
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
mongoose.connect(
process.env.DATABASE
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log("Database Connected!"));
