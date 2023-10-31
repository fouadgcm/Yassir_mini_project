import express from 'express'

const router = express.Router()

// list all our employees from db
router.get('/', (req, res) => {
  console.log('getEmployees triggered')
})

export default router
