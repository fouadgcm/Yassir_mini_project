import express from 'express'

const router = express.Router()

// a path to add a new employee to db
router.post('/', (req, res) => {
  // employee = req.params
  console.log('addEmployee triggered')
  console.log(req.body)
  res.status(201).send('addEmployee triggered')
})

// list all our employees from db
router.get('/', (req, res) => {
  console.log('getEmployees triggered')
  res.status(201).send('getEmployees triggered')
})

// list all our employees from db created on specific date
router.get('/q/', (req, res) => {
  const date = req.query
  console.log('getEmployees specific date triggered')
  console.log(date)
  res.status(201).send('getEmployees specific date triggered')
})

export default router
