const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const addTask = asyncHandler(async (req, res) => {
  const { title, description, list_type, due_date } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add title');
  }

  const task = Task.create({
    title,
    description,
    list_type,
    due_date,
  });

  if (task) {
    res.status(201);
  } else {
    res.status(400);
    throw new Error('Task data not valid');
  }
});

// const getTasks = asyncHandler(async(req, res) => {
//     const
// })

module.exports = { addTask };
