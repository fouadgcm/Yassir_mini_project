import express from 'express'
import bodyParser from 'body-parser'

import employeesRoutes from './routes/employees.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

// routes to our different employees requests
app.use('/employees', employeesRoutes)

// home page of our server
app.get('/', (req, res) => {
  console.log('Hello to Home Page')
  res.status(201).send('Hello To Home Page')
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: http://localhost:${PORT}`)
})
