const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: {type:String, required:true},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  role: {type: String, required:true},
  role_id: [{ type: Schema.Types.ObjectId, ref: 'roles' }],
  grade: Number,
  grade_subjects: Array,
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date }
});

UserSchema.virtual('student_code').get(function () {
  const date = new Date(this.created_at)
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const code = year + "-" + month + "-" + this._id + "-" + this.lastName.toUpperCase();
  return code;
});

const RoleSchema = Schema({
  name: { type: String, required: true }
});

const Users = mongoose.model('Users', UserSchema);
const Roles = mongoose.model('roles', RoleSchema);

module.exports = { Users, Roles }
