import express from 'express'
import bodyParser from 'body-parser'
import mongoose, { connect } from 'mongoose'

import employeesRoutes from './routes/employees.js'
import checkerRoutes from './routes/checker.js'

const app = express()
const PORT = 5000

// connect to db
const dpPassword = 'IHBd3AiejYVzpj9N'
const uri = `mongodb+srv://fouad_gcm:${dpPassword}@cluster0.gqrhczn.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri)

app.use(bodyParser.json())
// routes to our different employees requests
app.use('/employees', employeesRoutes)
// routes to perform checker requests
app.use('/employees/checker', checkerRoutes)

// home page of our server
app.get('/', (req, res) => {
  console.log('Hello to Home Page')
  res.status(201).send('Hello To Home Page')
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: http://localhost:${PORT}`)
})
