const express = require('express')
const path = require('path')
const registrationRoutes = require('./routes/registrationRoutes')
const validationMiddleware = require('./middlewares/validationMiddleware')

const app = express()

app.use(express.json())
app.use(validationMiddleware)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/registration', registrationRoutes)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

module.exports = app
