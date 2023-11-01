import express from 'express'
import mongoose from 'mongoose'
import Check from '../models/check.js'

const router = express.Router()
// helpful func to do tests
function dateAddHours(a, b) {
  var d = new Date(b || new Date())
  d.setHours(d.getHours() + a)
  return d
}

// perform a check-in
// route to check-in: http://localhost:5000/employees/checker/check-in
// we need to provide a valid employeeId and comment to check-in
router.post('/check-in', (req, res) => {
  console.log('Employee check-in')
  const check = new Check({
    _id: new mongoose.Types.ObjectId(),
    checkInTime: new Date(),
    // checkOutTime: dateAddHours(2, new Date()), //just to test
    ...req.body,
  })
  check
    .save()
    .then((response) => {
      console.log(
        `The Employee with the id ${req.body.employeeId} has checked-in successfully`
      )
      res.status(201).json({
        message: `The Employee with the id ${req.body.employeeId} has checked-in successfully`,
        response,
      })
    })
    .catch((err) => {
      console.log({
        err: err.message,
      })
    })
})

// perform a check-out
// route to check out: http://localhost:5000/employees/checker/check-out
// we need to provide a valid employeeId and comment to check-out
router.patch('/check-out', (req, res) => {
  const { employeeId, comment } = req.body
  const employeeIdFilter = {
    employeeId,
  }
  const checkOutFilter = {
    checkOutTime: null,
  }
  const fieldsToUpdate = {
    comment,
    checkOutTime: new Date(),
  }

  Check.findOneAndUpdate(employeeIdFilter, fieldsToUpdate, {
    returnOriginal: false,
  })
    .sort('-checkInTime')
    .where(checkOutFilter)
    .exec()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: `The Employee with the id ${employeeId} has checked-out successfully`,
        result,
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(401).json({
        message: `Error while the Employee with the id ${employeeId} tried to check-out`,
        error,
      })
    })
})

// help routes to list all checks made by employees
// route example: http://localhost:5000/employees/checker
router.get('/', (req, res) => {
  console.log('list of Checks')
  Check.find()
    .exec()
    .then((response) => {
      console.log(response)
      res.status(201).json({
        message: 'The list of Checks',
        response,
      })
    })
    .catch((err) => {
      console.log('error: ' + err)
      res.status(400).json({
        err: err.message,
      })
    })
})

export default router
