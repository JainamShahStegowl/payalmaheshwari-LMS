const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = Schema({
  title: {type: String, required:true},
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required:true },
  course_id: { type: Schema.Types.ObjectId, ref: 'courses', required:true },
  parent_id: [{ type: Schema.Types.ObjectId, ref: 'topics' }],
  content: String,
});

const Topics = mongoose.model('Topics', topicSchema);
module.exports = Topics
