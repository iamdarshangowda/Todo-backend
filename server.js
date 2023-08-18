const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const { connectDB, sessionStore } = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
const strategy = require('./services/googleStrategy');

connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use('/auth', require('./routes/googleAuthRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/', require('./routes/tasksRouter'));
app.use('/', require('./routes/listsRouter'));
app.use('/', require('./routes/stickyRouter'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
