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
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
