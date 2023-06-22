const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');

// Add new Task
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

// Add new Task based on 'today', 'upcoming, 'personal' and 'work'
const getTasks = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const queryData = req.query;

  let filters = {};
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  switch (queryData?.date) {
    case 'upcoming':
      filters.due_date = {
        $gt: endOfDay,
      };
      break;

    case 'today':
      filters.due_date = { $gte: startOfDay, $lt: endOfDay };
      break;

    default:
      filters = queryData;
      break;
  }

  try {
    const taskList = await Task.find({ user_id, ...filters }).sort({
      updatedAt: 'desc',
    });

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

// Delete Task'
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

// Update Task
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

// Count Tasks based on 'today', 'upcoming, 'personal' and 'work'
const countTasks = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  try {
    const results = await Promise.allSettled([
      Task.count({ user_id, due_date: { $gte: startOfDay, $lt: endOfDay } }),
      Task.count({ user_id, due_date: { $gte: endOfDay } }),
      Task.count({ user_id, list_type: 'personal' }),
      Task.count({ user_id, list_type: 'work' }),
    ]);

    const counts = results.map((result) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error('Error when counting tasks:', result.reason);
        return null;
      }
    });

    const [today, upcoming, personal, work] = counts;

    res.status(200).json({ today, upcoming, personal, work });
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong when counting tasks');
  }
});

module.exports = { addTask, getTasks, deleteTask, updateTask, countTasks };
