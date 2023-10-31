import mongoose from 'mongoose'

const checkSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  checkInTime: {
    type: Date,
    required: [true, 'CheckIn must have date and time'],
  },
  checkOutTime: {
    type: Date,
    // required: [true, 'CheckOut must have date and time'],
    default: null, // it will be changed with the date and time once the employee checkOut
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee must identify by employeeId'],
  },
  comment: {
    type: String,
    required: [true, 'Check must have comment'],
  },
  deltaTimeCheck: {
    type: Date,
    default: null, // it will be changed via a trigger (with the difference between checkIn and checkOut time) once the employee check out
  },
})

export default mongoose.models?.Check || mongoose.model('Check', checkSchema)
