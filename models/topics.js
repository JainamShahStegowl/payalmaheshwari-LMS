const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = Schema({
  title: {type: String, required:true},
  user_id: { type: Schema.Types.ObjectId, ref: 'Users', required:true, immutable:true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Courses', required:true, immutable:true },
  parent_id: [{ type: Schema.Types.ObjectId, ref: 'Topics', immutable:true }],
  content: String,
});

const Topics = mongoose.model('Topics', topicSchema);
module.exports = Topics
