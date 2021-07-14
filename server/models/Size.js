const mongoose = require('mongoose');

const { Schema } = mongoose;

const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
    trim: true
  }
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
