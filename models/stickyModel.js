const mongoose = require('mongoose');

const stickySchema = mongoose.Schema(
  {
    text: {
      type: String,
      require: [true, 'Please add text for the sticky notes'],
    },
    user_id: {
      type: String,
      require: [true, 'User not valid'],
    },
    stickyColor: {
      type: String,
      require: [true, 'Sticky color is missings'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sticky', stickySchema);
