const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = Schema({
  subject_id: { type: Schema.Types.ObjectId, ref: 'subjects', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date, default: Date.now() },
  is_published: { type: Boolean, default: false }
});


const Courses = mongoose.model('Courses', courseSchema);


module.exports = Courses
