const asyncHandler = require('express-async-handler');
const Sticky = require('../models/stickyModel');

// Add new Sticky
const addSticky = asyncHandler(async (req, res) => {
  const { text, stickyColor } = req.body;
  const { user_id } = req;

  if (!text) {
    res.status(400);
    throw new Error('Please add text for sticky');
  }

  const sticky = await Sticky.create({
    text,
    stickyColor,
    user_id,
  });

  if (sticky) {
    res.status(201).json({ message: 'Sticky note created Successfully' });
  } else {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

// Add new Sticky
const getStickies = asyncHandler(async (req, res) => {
  const { user_id } = req;

  try {
    const stikiesList = await Sticky.find({ user_id }).sort({
      updatedAt: 'desc',
    });

    if (!stikiesList) {
      res.status(404);
      throw new Error('No Tasks found');
    }

    res.status(200).json(stikiesList);
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

// Update Sticky
const updateSticky = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { id } = req.query;
  const { user_id } = req;

  if (!id) {
    res.status(403);
    throw new Error('Task ID not found');
  }

  try {
    const updatedSticky = await Sticky.findOneAndUpdate({ user_id, _id: id }, { text });

    res
      .status(201)
      .json({ id: updatedSticky._id, message: 'Sticky updated succesfully' });
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

// Delete Sticky
const deleteSticky = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { user_id } = req;

  if (!id) {
    res.status(403);
    throw new Error('Task ID not found');
  }

  try {
    const updatedSticky = await Sticky.findOneAndDelete({ user_id, _id: id });

    res
      .status(200)
      .json({ id: updatedSticky._id, message: 'Sticky deleted succesfully' });
  } catch (err) {
    res.status(500);
    throw new Error('Something went wrong');
  }
});

module.exports = { addSticky, getStickies, updateSticky, deleteSticky };
