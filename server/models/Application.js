const mongoose = require('mongoose');

const { Schema } = mongoose;

const applicationSchema = new Schema({
  applicationDate: {
    type: Date,
    default: Date.now
  },
  dogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dog'
    }
  ]
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
