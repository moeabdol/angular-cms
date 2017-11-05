const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PageSchema = new Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  sidebar: { type: Boolean, default: false }
});

module.exports = mongoose.model('Page', PageSchema);
