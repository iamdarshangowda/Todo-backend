const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

const addTask = asyncHandler(async (req, res) => {
  const { title, description, list_type, due_date } = req.body;
  const { user_id } = req;

  if (!title) {
    res.status(400);
    throw new Error('Please add title');
  }

  const task = Task.create({
    title,
    description,
    list_type,
    due_date,
    user_id,
  });

  if (task) {
    res.status(201).json({ message: 'Task created Successfully' });
  } else {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

const getTasks = asyncHandler(async (req, res) => {
  const { user_id } = req;

  try {
    const taskList = await Task.find({ user_id }).sort({ updatedAt: 'desc' });

    if (!taskList) {
      res.status(404);
      throw new Error('No Tasks found');
    }

    res.status(200).json(taskList);
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const { id } = req.query;

  if (!id) {
    res.status(403);
    throw new Error('Task ID not found');
  }

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, user_id });
    res.status(200).json({ id: deletedTask._id, message: 'Task deleted succesfully' });
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong when deleting');
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const { id } = req.query;
  const newData = req.body;

  if (!id) {
    res.status(403);
    throw new Error('Task ID not found');
  }

  try {
    const updatedTask = await Task.findOneAndUpdate({ _id: id, user_id }, newData);
    console.log(updatedTask);
    res.status(200).json({ id: updatedTask._id, message: 'Task updated succesfully' });
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong when updating');
  }
});

module.exports = { addTask, getTasks, deleteTask, updateTask };
