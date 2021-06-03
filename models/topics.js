const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = Schema({
  title: {type: String, required:true},
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required:true, immutable:true },
  course_id: { type: Schema.Types.ObjectId, ref: 'courses', required:true, immutable:true },
  parent_id: [{ type: Schema.Types.ObjectId, ref: 'topics', immutable:true }],
  content: String,
});

const Topics = mongoose.model('Topics', topicSchema);
module.exports = Topics
