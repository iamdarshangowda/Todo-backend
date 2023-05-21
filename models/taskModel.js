const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Please add title for the tasks'],
    },
    description: {
      type: String,
    },
    list_type: {
      type: String,
    },
    due_date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
