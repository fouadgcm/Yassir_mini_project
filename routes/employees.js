import express from 'express'
import Employee from '../models/employee.js'
import mongoose from 'mongoose'

// function to use date without time
function getDateWithoutTime(date = new Date()) {
  var d = new Date(date)
  // Month index starts from 0
  var dateWithoutTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  return dateWithoutTime
}

const router = express.Router()

// a path to add a new employee to db
// route example: http://localhost:5000/employees
router.post('/', (req, res) => {
  console.log('Add An Employee triggered')
  //   const { dateCreated } = req.body
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
    dateCreated: getDateWithoutTime(),
    //  lastName: ,
    //  firstName: ,
    //  department:
    // dateCreated,
  })
  console.log(employee)
  employee
    .save()
    .then((response) => {
      console.log('The Employee has been added to the db')
      res.status(201).json({
        message: 'The Employee has been added to the db',
        response,
      })
    })
    .catch((err) => {
      console.log({
        err: err.message,
      })
    })
})

// list all our employees from db
// route example: http://localhost:5000/employees
router.get('/', (req, res) => {
  console.log('list Employees triggered')
  Employee.find()
    .exec()
    .then((response) => {
      console.log(response)
      res.status(201).json({
        message: 'The list of all Employees',
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

// list (filter) all our employees from db based on date of creation
// route example: http://localhost:5000/employees/q?date=2023-10-31
// we need to specify the day and the month on 2 digits, example: 1986-10-06 or 2000-01-01
router.get('/q', (req, res) => {
  console.log('Filter Employees Date triggered')
  //   const date = getDateWithoutTime(req.query.date)
  const date = new Date(req.query.date)
  date.setUTCHours(0, 0, 0)

  Employee.find({ dateCreated: date })
    .exec()
    .then((response) => {
      console.log(response)
      res.status(201).json({
        message: `The list of all Employees created on ${date}`,
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

// function that delete all employees to help in test case
router.delete('/destroy', (req, res) => {
  console.log('Delete All Employees triggered')
  Employee.deleteMany()
    .exec()
    .then((response) => {
      console.log(response)
      res.status(201).json({
        message: 'All Employees have been deleted',
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
