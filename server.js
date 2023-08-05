const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const strategy = require('./services/googleStrategy');
const MongoStore = require('connect-mongo');

connectDB();
const PORT = process.env.PORT || 5000;

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'session',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5001', credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/googleAuthRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/', require('./routes/tasksRouter'));
app.use('/', require('./routes/listsRouter'));
app.use('/', require('./routes/stickyRouter'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
