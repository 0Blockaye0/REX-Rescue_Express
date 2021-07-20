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
  age: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
