const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const jwt = require('jsonwebtoken');

const addTask = asyncHandler(async (req, res) => {
  const { title, description, list_type, due_date } = req.body;

  const token = req.token;
  if (!token) {
    res.status(403);
    throw new Error('User not Authorised to Create Task');
  } else {
    // Todo - verify jwt token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, authData) => {
      if (error) {
        console.log(error.message);
        res.status(403);
        throw new Error('Token not valid');
      } else {
        if (!title) {
          res.status(400);
          throw new Error('Please add title');
        }

        const task = Task.create({
          title,
          description,
          list_type,
          due_date,
          user_id: authData.user.id,
        });

        if (task) {
          res.status(201).json({ message: 'Task created Successfully' });
        } else {
          res.status(400);
          throw new Error('Task data not valid');
        }
      }
    });
  }
});

// const getTasks = asyncHandler(async(req, res) => {
//     const
// })

module.exports = { addTask };
