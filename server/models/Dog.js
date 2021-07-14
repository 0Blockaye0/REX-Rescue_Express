const mongoose = require('mongoose');

const { Schema } = mongoose;

const dogSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  breed: {
    type: String
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: 'Size',
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
