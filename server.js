const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

connectDB();
const PORT = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
app.use('/user', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
