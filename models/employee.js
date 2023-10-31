import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  lastName: {
    type: String,
    required: [true, 'Employee must have last name'],
  },
  firstName: {
    type: String,
    required: [true, 'Employee must have first name'],
  },
  dateCreated: {
    type: Date,
    // required: [true, 'Employee must have Created date'],
  },
  department: {
    type: String,
    required: [true, 'Employee must have department'],
  },
})

// module.exports = mongoose.model('Employee', employeeSchema)
export default mongoose.models?.Employee ||
  mongoose.model('Employee', employeeSchema)
