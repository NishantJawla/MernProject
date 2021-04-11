require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cookie } = require('express-validator');
// My routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//dbconnection
mongoose.connect(
process.env.DATABASE
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log("Database Connected!"));

//myroutes
app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
//port
const port = process.env.PORT || 8000;

//starting a sever
app.get('/', (req, res) => {
return 	res.send("Welcome to Home Page!");
});
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});