const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const addList = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const newList = req.body;

  if (!newList) {
    res.status(400);
    throw new Error('List Name Required');
  }

  try {
    const result = await User.findOneAndUpdate(
      { _id: user_id },
      { $addToSet: { lists: newList } }
    );

    if (!result._id) {
      res.status(404);
      throw new Error('No matching document found');
    }

    res
      .status(200)
      .json({
        oldList: result.lists,
        newlyAdded: newList,
        message: 'List created Successfully',
      });
  } catch (err) {
    res.status(400);
    throw new Error('User data not valid');
  }
});

const getLists = asyncHandler(async (req, res) => {
  const { user_id } = req;

  if (!user_id) {
    res.status(400);
    throw new Error('Not Authorized');
  }

  try {
    const result = await User.findOne({ _id: user_id }, 'lists');

    if (!result._id) {
      res.status(404);
      throw new Error('No matching document found');
    }

    res.status(200).json({ lists: result.lists });
  } catch (err) {
    res.status(400);
    throw new Error('User data not valid');
  }
});

const updateLists = asyncHandler(async (req, res) => {
  const { user_id } = req;
  const { list } = req.body;

  if (!user_id) {
    res.status(400);
    throw new Error('Not Authorized');
  }

  try {
    const result = await User.updateOne({ _id: user_id }, { $pull: { lists: { list } } });

    if (result.modifiedCount === 0) {
      res.status(404);
      throw new Error('No matching document found');
    }

    res.status(200).json({ message: 'Lists Updated' });
  } catch (err) {
    res.status(400);
    throw new Error('User data not valid');
  }
});

module.exports = { addList, getLists, updateLists };
