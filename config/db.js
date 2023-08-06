const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log('database connect', connect.connection.host, connect.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'session',
});

module.exports = { connectDB, sessionStore };
