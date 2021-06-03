const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = Schema({
  name: { type: String, required: true },
  grade: { type: Number, required: true }
});

const Department = mongoose.model("Department", departmentSchema)

module.exports = Department